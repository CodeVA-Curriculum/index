import { globby } from 'globby'
import { read } from 'to-vfile'
import { eq } from 'drizzle-orm'
import * as schema from './schema'
import { fileToElementObj, parseGuideFiles, parseProjectFile, parseNodeFile } from './parse'

export async function seedGuides(db:any, schema:any) {
  let paths = await globby(['static/trail-guides', '!static/trail-guides/README.md'], {
    expandDirectories: { files: ['*.md'] }
  })

  // First, add all the guides
  const guidePaths = paths.filter((p) => p.includes('meta.md'))
  console.log(guidePaths)
  let els = await parseGuideFiles(guidePaths)
  const guides = await db.insert(schema.guide).values(els).returning()

  // Then, do the projects
  const projectPaths = paths.filter((p) => p.includes('projects') && p.includes('index.md'))
  for(const path of projectPaths) {
    const file = await parseProjectFile(path)
    file.guide = getGuideIdFromPath(path, guides)
    file.hidden = path.includes('_')
    file.url = path
    await db.insert(schema.project).values(file)
  }

  // Next, all the nodes
  const nodePaths = await paths.filter((p) => !projectPaths.includes(p) && !guidePaths.includes(p))
  for(const path of nodePaths) {
    console.log("Rendering node", path)
    let mapPath = path.replace('static/trail-guides/', '')
    const guideName = mapPath.substring(0, mapPath.indexOf('/'))
    const mapFile = (await read("static/trail-guides/"+guideName+"/map.canvas")).toString()
    const canvas = await JSON.parse(mapFile)
    const file = await parseNodeFile(path)
    if(mapFile.length > 0) {
      const mapNode = canvas.nodes.filter((obj)=>guideName+"/"+obj.file==file.path)
      if(mapNode.length > 0) {
        file.x = mapNode[0].x
        file.y = mapNode[0].y
        file.uid = mapNode[0].id
      }
    }
    file.guide = getGuideIdFromPath(path, guides)
    file.type = path.includes('projects/') ? 'cache' : 'tutorial'

    const { id } = (await db.insert(schema.node).values(file).returning())[0]
    console.log(`Added ${path} to database with uid ${file.uid}`)

    // Add and associate questions
    for(const question of file.questions) {
      const o = {
        node: id,
        title: question.title? question.title: "No title given",
        raw: JSON.stringify(question),
        content: question.text,
        options: JSON.stringify(question.options),
      }      
      await db.insert(schema.question).values(o)
    }
    // add and associate prompts
    for(const prompt of file.prompts) {
      const o = {
        node: id,
        title: prompt.title? prompt.title: "No title given",
        content: prompt.text
      }      
      await db.insert(schema.prompt).values(o)
    }
    
  }

  // Insert edges from canvas
  for(const guide of guides) {
    const guideName = guide.path.replace('/meta.md', '')
    const mapFile = (await read("static/trail-guides/"+guideName+"/map.canvas")).toString()
    const canvas = await JSON.parse(mapFile)
    for(const edge of canvas.edges) {
      const fromNode = (await db.select().from(schema.node).where(eq(schema.node.uid, edge.fromNode)))[0]
      const toNode = (await db.select().from(schema.node).where(eq(schema.node.uid, edge.toNode)))[0]
      if(!fromNode || !toNode) { throw new Error(`Edge ${edge.id} in ${guideName} refers to node not present in database! From: ${edge.fromNode} To: ${edge.toNode}`)}
      await db.insert(schema.edge).values({
        uid: edge.id,
        from: fromNode.id,
        to: toNode.id,
        guide: guide.id,
        fromSide: edge.fromSide,
        toSide: edge.toSide
      })
    }
  }

  // Assemble project graph
  const projects = await db.select().from(schema.project)
  for(const project of projects) {
    console.log("Assembling project graph for ", project.path)
    const guide = (await db.select().from(schema.guide).where(eq(schema.guide.id, project.guide)))[0]
    const pathStem = guide.path.replace('meta.md', '')
      // the nodes are grouped
    let groups = []
    for(const [k,v] of Object.entries(project.nodes)) {
      groups = [...groups, ...(await db.insert(schema.nodeGroup).values({
        projectId: project.id,
        alias: k,
      }).returning())]
    }
    let toProcess = []
    let aliasToLastNode = {}
    for(const group of groups) {
      const nodeList = project.nodes[group.alias]
      let { unprocessed, lastNode} = await groupNodes(db, group, project, nodeList, pathStem)
      aliasToLastNode[group.alias] = lastNode.id
      toProcess.push( { data: unprocessed, alias: group.alias })
    }
    // Create associations between edges and first edges of node_groups
    for(const o of toProcess) {
      await db.insert(schema.nodeToNodeGroup).values({
        nodeId: aliasToLastNode[o.alias],
        groupId: o.groupId,
        projectId: o.projectId,
        optional: o.optional,
        index: o.index
      })
    }


  }
  // for(const node of projects.nodes) {
  //   console.log(node)
  //   const o = (await db.select().from(schema.node).where(eq(schema.node.path, node)))
  // }
}

function getGuideIdFromPath(path:string, guides:any[]):number {
    return (guides.filter((g) => path.includes(g.path.replace('meta.md', ''))))[0].id
}


async function groupNodes(db:any, group:schema.NodeGroup, project:schema.Project, nodeList:string[], pathStem:string, groupTitles:string[]) {
    let index = 0
    let lastNode
    let unprocessed:number[] = []
    for(const node of nodeList) {
      const cleanNodePath = pathStem + node.replace(pathStem, '').replace(' {optional}', '').replace('./', project.path.replace(pathStem, '').replace('index.md', ''))
      if(cleanNodePath.includes("$")) {
        console.log("Found alias, adding to unprocessed...", cleanNodePath)
        unprocessed.push({
          nodeId: cleanNodePath.substring(cleanNodePath.indexOf('$')),
          index: index,
          projectId: project.id,
          groupId: group.id,
          optional: node.includes('{optional}')
        })
      } else {
        console.log("Linking to", cleanNodePath)
        const o = (await db.select().from(schema.node).where(eq(schema.node.path, cleanNodePath)))[0]
        lastNode = await db.insert(schema.nodeToNodeGroup).values({
          nodeId: o.id,
          groupId: group.id,
          projectId: project.id,
          optional: node.includes('{optional}'),
          index: index
        }).returning()
        index++
      }
    }
    return { unprocessed, lastNode }
}
