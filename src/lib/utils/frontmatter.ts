import YAML from 'yaml'
import * as fs from 'fs'
import { parseFrontmatter } from './parsers'
import {getParentDirectory, getParentMeta} from './pathUtils'
import { importLibraryGlob } from '.'
import { srcToUrl } from './pathUtils'

const inheritableFields = ['authors', 'subjects', 'grades', 'license', 'tags', 'types', 'audiences', 'image']

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
    grades:string[],
    children:Frontmatter[]
    parents:Frontmatter[],
    members:Frontmatter[],
    groups:Frontmatter[],
    contents:string[],
    license?:License,
    tags:string[],
    audiences:string[],
    standards:string[],
    links:Links,
    image:string
}

interface Links {
    goopen?:string,
    drive?:string,
    pdf?:string,
    ext?:string
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
        tags:[],
        audiences:[],
        standards:[],
        links:{},
        image: 'default.png'
    }
}

function splitString(string:any, separator:string):any[] {
    let list = []
    if(typeof(string) == typeof('string')) {
      list.push(...string.split(separator))
    } else {
      throw new Error(`Tried to split frontmatter ${string} of type ${typeof(string)} attribute of incorrect data type! Make sure the field you are trying to split is inheritable.`)
    }
    return list
  }

async function postprocess(frontmatter:Frontmatter):Frontmatter {
    frontmatter.subjects = splitString(frontmatter.subjects, ', ')
    frontmatter.grades = splitString(frontmatter.grades, ', ')
    frontmatter.types = splitString(frontmatter.types, ', ')
    frontmatter.tags = splitString(frontmatter.tags, ', ')
    frontmatter.audiences = splitString(frontmatter.audiences, ', ')
    if(frontmatter.standards) {
        frontmatter.standards = splitString(frontmatter.standards, ', ')
        // Expand standards names with API route
    }
    return frontmatter
}

export async function getProjectsFrontmatter():Promise<Frontmatter[]> {
    const library = await importLibraryGlob('meta')
    let frontmatters:Frontmatter[] = []
    for(const path in library) {
        // console.log(validPath.path)
        const validPath:Path = {
            path: path.replace('/src/content/', '') as `${string}.md`,
            exists: true
        }
        // console.log(validPath.path)
        let frontmatter = await parseFrontmatter(validPath)
        frontmatter.parents = await findAndInheritFromParents(frontmatter)
        frontmatter.members = await findMemberFrontmatter(frontmatter)
        frontmatter = await postprocess(frontmatter)
        // console.log(frontmatter)

        frontmatters.push(frontmatter)
    }
    return frontmatters
}

async function getAllFrontmatter():Promise<Frontmatter[]> {
    // Frontmatter for everything in the library
    const library = await importLibraryGlob('all')
    let frontmatters:Frontmatter[] = []
    for(const path in library) {
        const validPath:Path = {
            path: `${srcToUrl(path)}.md`.replace('/library/browse/', '') as `${string}.md`,
            exists: true
        }
        let frontmatter = await parseFrontmatter(validPath)
        frontmatter.parents = await findAndInheritFromParents(frontmatter)
        frontmatter.members = await findMemberFrontmatter(frontmatter)
        frontmatter = await postprocess(frontmatter)
        // console.log(frontmatter.title, frontmatter.subjects)

        frontmatters.push(frontmatter)
    }
    return frontmatters
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
        for(let j=0;j<parents.length;j++) {
            // Parents are ordered from most direct to least
            const parent = parents[j]
            let end = false
            if(!frontmatter.hasOwnProperty(field) && parent.hasOwnProperty(field)) {
                // @ts-ignore
                // This is kept safe by the condition above
                frontmatter[field] = parent[field]
                end = true
            }

            // Handle "plusfields", which start with `_`
            const plusId = '_'+field
            if(frontmatter.hasOwnProperty(plusId) && parent.hasOwnProperty(field)) {
                // If the element has an add-on tag, add to it
                const plusField = [...frontmatter[plusId].split(',')]
                for(let k=0;k<plusField.length;k++) {
                    frontmatter[field] += ', '+plusField[k]
                }
                end = true
            }
            if(end) { break }
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
        typeof(frontmatter.authors) == 'string',
        // frontmatter.links != null,
        // frontmatter.links.drive != null,
        // frontmatter.links.pdf != null
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
    const contents = frontmatter.contents ? frontmatter.contents : []
    for(let i=0;i<contents.length;i++) {
        const parentDirectory = getParentDirectory(frontmatter.pathData)+'/'
        let memberPath:Path
        // TODO: better file finding
        memberPath = validatePath(frontmatter.contents[i].replace('./', parentDirectory).replace('.md', ''))
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
export {applyYAML, defaultFrontmatter, findAndInheritFromParents, findMemberFrontmatter, checkFrontmatterRequirements, auditFrontmatter, getAllFrontmatter, postprocess}