import { globby } from 'globby'
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
    await db.insert(schema.project).values(file)
  }

  // Next, all the nodes
  const nodePaths = paths.filter((p) => !projectPaths.includes(p) && !guidePaths.includes(p))
  for(const path of nodePaths) {
    const file = await parseNodeFile(path)
    file.guide = getGuideIdFromPath(path, guides)
    file.type = path.includes('projects/') ? 'cache' : 'tutorial'
    await db.insert(schema.node).values(file)
  }

  // Assemble project graph
  const projects = await db.select().from(schema.project)
  for(const project of projects) {
    const guide = (await db.select().from(schema.guide).where(eq(schema.guide.id, project.guide)))[0]
    const pathStem = guide.path.replace('meta.md', '')
    if(Array.isArray(project.nodes)) {
      // all the nodes are in one group
      const group = (await db.insert(schema.nodeGroup).values({
        projectId: project.id
      }).returning())[0]
      await groupNodes(db, group, project, project.nodes, pathStem)
    } else {
      // the nodes are grouped
      let groups = []
      for(const group of project.nodes) {
        groups = [...groups, ...(await db.insert(schema.nodeGroup).values({
          projectId: project.id,
          alias: group,
        }))]
      }
      for(const group of groups) {
        const nodeList = project.nodes[group.alias]
        await groupNodes(db, group, project, nodeList, pathStem)
      }
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
