import { eq, like } from 'drizzle-orm'
import { getDbStandardsFromAbbrList } from '$lib/server/db'
import { seedGuides } from '$lib/server/db/guides'
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { globby } from 'globby'
import Database from 'better-sqlite3';
import * as schema from '$lib/server/db/schema'
import { seedSubjects } from '$lib/server/db/seedSubjects'
import { fileToElementObj, parseNodeFile, seedActivities, parseProjectFile } from '$lib/server/db/parse'
import { seedStandards } from '$lib/server/db/seedStandards'
import { expandDashNotation } from '$lib/server/db/utils'

async function main() {
  let warningCount = 0
  let errorCount = 0
  let paths = await globby(['static/trail-guides', '!static/trail-guides/README.md', '!static/trail-guides/**/README.md'], {
    expandDirectories: { files: ['*.md'] }
  })

  // Audit project files to make sure `nodes` lists are valid
  const guidePaths = paths.filter((p) => p.includes('meta.md'))
  const projectPaths = paths.filter((p) => p.includes('projects') && p.includes('index.md'))
  const nodePaths = await paths.filter((p) => !projectPaths.includes(p) && !guidePaths.includes(p))
  let validNodePaths = []
  for(const path of nodePaths) {

    let mapPath = path.replace('static/trail-guides/', '')
    const guideName = mapPath.substring(0, mapPath.indexOf('/'))
    validNodePaths.push(path.replace('static/trail-guides/' + guideName + '/', ''))
  }


  for(const path of projectPaths) {
    const file = await parseProjectFile(path)
    errorCount += assert(file, (file.title && file.title.length > 0), "Project frontmatter must include a title.")
    errorCount += assert(file, (file.nodes || Array.isArray(file.nodes)), "Project frontmatter must include a valid nodes list.")
    let nodeList = []
    if(Array.isArray(file.nodes)) {
      nodeList = file.nodes
    } else {
      for(const [k,v] of Object.entries(file.nodes)) {
        nodeList = [...nodeList, ...v]
      }
    }
    for(const refPath of nodeList) {
      let clean = refPath.replace('./', file.path.replace('/index.md', '/')).replace('{optional}', '').replace(' ', '')
      if(clean.includes('projects')) {
        clean = clean.substring(clean.indexOf('/')+1)
      }
      errorCount += assert(file, validNodePaths.includes(clean), `${clean} does not reference a valid node.`)
    }
    warningCount += warn(file, (file.short && file.short.length > 0), "Project frontmatter should include a short description")
    warningCount += warn(file, (file.long && file.long.length > 0), "Project frontmatter should include a long description")
  }
  for(const path of nodePaths) {
    // console.log("Rendering node", path)
    let mapPath = path.replace('static/trail-guides/', '').replace('{optional}','').replace(' ', '')
    const guideName = mapPath.substring(0, mapPath.indexOf('/'))
    // const mapFile = (await read("static/trail-guides/"+guideName+"/map.canvas")).toString()
    
  }

  console.log("Warnings", warningCount)
  console.log("Errors", errorCount)
}

function getGuideIdFromPath(path:string, guides:any[]):number {
    return (guides.filter((g) => path.includes(g.path.replace('meta.md', ''))))[0].id
}



function assert(obj, exp, label="no label") {
  if(!exp) {
    logError(`ERROR ${obj.path}: ${label}`)
    return 1
  }
  return 0
}
function warn(obj,exp,label="no label") {
  if(!exp) {
    logWarning(`WARNING ${obj.path}: ${label}`)
    return 1
  }
  return 0
}

function logError(message) {
  console.log(message)
}
function logWarning(message) {
  console.log(message)
}

main()
