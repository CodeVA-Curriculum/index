import { globby } from 'globby'
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
}

function getGuideIdFromPath(path:string, guides:any[]):number {
    return (guides.filter((g) => path.includes(g.path.replace('meta.md', ''))))[0].id
}
