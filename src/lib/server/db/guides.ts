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
  const nodePaths = paths.filter((p) => !projectPaths.includes(p) && !guidePaths.includes(p))
  for(const path of nodePaths) {
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

    // Add and associate questions
    for(const question of file.questions) {
      const o = {
        node: id,
        title: question.name ? question.name : "No title given",
        raw: JSON.stringify(question),
        content: question.text,
        options: JSON.stringify(question.options),
      }      
      await db.insert(schema.question).values(o)
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
    for(const group of groups) {
      const nodeList = project.nodes[group.alias]
      await groupNodes(db, group, project, nodeList, pathStem)
    }
    // Create associations between edges and node_groups

  }
  // for(const node of projects.nodes) {
  //   console.log(node)
  //   const o = (await db.select().from(schema.node).where(eq(schema.node.path, node)))
  // }
}

function getGuideIdFromPath(path:string, guides:any[]):number {
    return (guides.filter((g) => path.includes(g.path.replace('meta.md', ''))))[0].id
}


async function groupNodes(db:any, group:schema.NodeGroup, project:schema.Project, nodeList:string[], pathStem:string) {
    let index = 0
    for(const node of nodeList) {
      const cleanNodePath = pathStem + node.replace(pathStem, '').replace(' {optional}', '').replace('./', project.path.replace(pathStem, '').replace('index.md', ''))
      const o = (await db.select().from(schema.node).where(eq(schema.node.path, cleanNodePath)))[0]
      await db.insert(schema.nodeToNodeGroup).values({
        nodeId: o.id,
        groupId: group.id,
        projectId: project.id,
        optional: node.includes('{optional}'),
        index: index
      })
      index++
    }
}
