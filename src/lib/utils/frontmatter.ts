import YAML from 'yaml'
import * as fs from 'fs'
import { parseFrontmatter } from './parsers'
import {getParentDirectory, getParentMeta} from './pathUtils'
import { importLibraryGlob } from '.'

const inheritableFields = ['authors', 'subject', 'grade', 'license']

interface Path {
    path:`${string}.md`,
    exists:boolean
}

export function validatePath(path:string):Path {
    // console.log('validating', path)
    let exists:boolean=false
    let validPath:string = path
    // add extension if needed
    // console.log('seeking file at',`src/content/${path}.md`)
    if(fs.existsSync(`src/content/${path}.md`)) {
        validPath = path
        exists=true
      } else if(fs.existsSync(`src/content/${path}/meta.md`)) {
        validPath = path+'/meta'
        exists=true
      } else {
        exists = false
      }
    // console.log(validPath, exists)
    return {
        exists: exists,
        path: `${validPath}.md`
    }
}

interface License {
    name:string,
    link:string
}

interface Frontmatter {
    title:string|null,
    authors:string,
    pathData:Path,
    subjects:string[],
    types:string[],
    grades:(string|number)[],
    children:Frontmatter[]
    parents:Frontmatter[],
    members:Frontmatter[],
    groups:Frontmatter[],
    contents:string[],
    license:License,
    tags:string[]
}

export function defaultPath():Path {
    return {
        path: `${''}.md`,
        exists: false
    }
}

function defaultFrontmatter() {
    return {
        title: null,
        authors: 'CodeVA Curriculum',
        pathData: defaultPath(),
        subjects: ['Computer Science'],
        grades: [],
        children: [],
        parents: [],
        members: [],
        contents: [],
        groups: [],
        types:[],
        tags:[]
    }
}


function applyYAML(yaml:string, pathData:Path) {
    const fmatter:Frontmatter = YAML.parse(yaml) as Frontmatter

    // ensure that yaml defines title, at least
    if(!fmatter.hasOwnProperty('title')) {
        throw new Error(`Element file at ${pathData.path} does not define a title!`)
    }
    return fmatter;
}

async function findParentFrontmatter(pathData:Path):Promise<Frontmatter[]> {
    // TODO: refactor to avoid using vite
    let actualParents:Frontmatter[] = []
    let path:string = pathData.path
    const possibleParents = await importLibraryGlob('meta-hidden')

    let parentPath = getParentMeta(pathData)
    // console.log('Loading parent at','/src/content'+parentPath.path)
    
    // @ts-ignore
    while(possibleParents['/src/content'+parentPath.path]) {
        // get the frontmatter for the parent, push to array
        actualParents.push(await parseFrontmatter(parentPath))
        if(parentPath.path == '/.meta.md' || parentPath.path == '/meta.md') {
            // console.log('Found top level parent for ',pathData.path, 'at', parentPath)
            break;
        }
        parentPath = getParentMeta(parentPath)
    }
    // console.log(actualParents)
        
    
    return actualParents
}

async function findAndInheritFromParents(frontmatter:Frontmatter):Promise<Frontmatter[]> {
    const parents = await findParentFrontmatter(frontmatter.pathData)
    // console.log(frontmatter.title, parents)
    // iterate over parents and inherit from inheritable fields
    for(let i=0;i<inheritableFields.length;i++) {
        const field = inheritableFields[i]
        for(let i=0;i<parents.length;i++) {
            // Parents are ordered from most direct to least
            const parent = parents[i]
            if(!frontmatter.hasOwnProperty(field) && parent.hasOwnProperty(field)) {
                // @ts-ignore
                // This is kept safe by the condition above
                frontmatter[field] = parent[field]
                break; // end the iteration--the field has been satisfied
            }
        }
    }
    parents.pop() // remove top-level /.meta.md parent from list
    return parents
}

function auditFrontmatter(frontmatter:Frontmatter) {
    const rules:boolean[]  = [
        frontmatter.pathData.exists,
        frontmatter.pathData.path.length > 0,
        frontmatter.title != null,
        typeof(frontmatter.authors) == 'string'
        // TODO: add rules for Google Drive & PDF links
    ]
    for(let i=0;i<rules.length;i++) {
        if(!rules[i]) {
            throw new Error(`File at ${frontmatter.pathData.path} does not define or inherit required properties! Failed rule ${i+1}`)
        } else {
            console.log(`File at ${frontmatter.pathData.path} passed rule ${i+1} check!`)
        }
    }
}

async function findMemberFrontmatter(frontmatter:Frontmatter):Promise<Frontmatter[]> {
    const members:Frontmatter[] = []
    
    // first, clean relative paths in contents
    for(let i=0;i<frontmatter.contents.length;i++) {
        const parentDirectory = getParentDirectory(frontmatter.pathData)+'/'
        const memberPath:Path = validatePath(frontmatter.contents[i].replace('./', parentDirectory).replace('.md', ''))
        // console.log('Parsing member frontmatter at', memberPath.path)
        members.push(await parseFrontmatter(memberPath))
    }
    
    for(let i=0;i<members.length;i++) {
        members[i].parents = await findAndInheritFromParents(members[i]) 
    }
    return members
}

function checkFrontmatterRequirements(frontmatter:Frontmatter) {
    if(!frontmatter.title) {
      throw new Error(`File at ${frontmatter.pathData.path} must define a title!`)
    }
    if(!frontmatter.authors) {
      return false
    }
  }

export type {Frontmatter, Path}
export {applyYAML, defaultFrontmatter, findAndInheritFromParents, findMemberFrontmatter, checkFrontmatterRequirements, auditFrontmatter}