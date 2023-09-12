import YAML from 'yaml'
import * as fs from 'fs'
import { parseFrontmatter } from './parsers'
import { importLibraryGlob } from '.'

const inheritableFields = ['authors', 'subject', 'grade']

interface Path {
    path:`${string}.md`,
    exists:boolean
}

export function validatePath(path:string):Path {
    let exists:boolean=false
    let validPath:string = path
    // add extension if needed
    if(fs.existsSync(`src/content/${path}.md`)) {
        validPath = path
        exists=true
      } else if(fs.existsSync(`src/content/${path}/meta.md`)) {
        validPath = path+'/meta'
        exists=true
      } else {
        exists = false
      }
    return {
        exists: exists,
        path: `${validPath}.md`
    }
}

interface Frontmatter {
    title:string|null,
    authors:string,
    pathData:Path,
    subject:string,
    grade:string|number,
    children:Frontmatter[]
    parents:Frontmatter[],
    members:Frontmatter[],
    groups:Frontmatter[],
    contents:string[]
}

function defaultPath():Path {
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
        subject: 'Computer Science',
        grade: 0,
        children: [],
        parents: [],
        members: [],
        contents: [],
        groups: []
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

// async function findParentFrontmatter(path) {
//     const possibleParents = await importLibraryGlob('meta')
//     let actualParents = []
//     for(const parent in possibleParents) {
//       const parentFrontmatter = await parseFrontmatter(parent)
//       for(let i=0;i<parentFrontmatter.contents.length;i++) {
//         const parentPath = parentFrontmatter.path
//         const docName = parentFrontmatter.contents[i].replace('./', parentPath.substring(0, parentPath.indexOf('/meta.md'))+'/')
//         if(docName == '/src/content/'+path+'.md') {
//           // console.log('Found parent at', parentPath)
//           // get parent object info
//           possibleParents[parentPath]().then((obj) => {
//             actualParents.push({
//               ...obj.metadata,
//               path: parentPath.substring('/src/content/'.length, parentPath.length-'meta.md'.length),
//               // content: obj.default // Do not include parent content
//             })
//           })
//         }
//       }
//     }
//     return actualParents;
//   }

async function findParentFrontmatter(pathData:Path):Promise<Frontmatter[]> {
    let actualParents:Frontmatter[] = []
    console.log('Finding parents from ', pathData.path)
    
    return actualParents
}

async function findAndInheritFromParents(frontmatter:Frontmatter):Promise<Frontmatter[]> {
    const parents = await findParentFrontmatter(frontmatter.pathData)
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
    return parents
}

function auditFrontmatter(frontmatter:Frontmatter) {
    const rules:boolean[]  = [
        // valid path
        // has title
        // has authors
    ]
    for(let i=0;i<rules.length;i++) {
        if(!rules[i]) {
            throw new Error(`File at ${frontmatter.pathData.path} does not define or inherit required properties!`)
        }
    }
}

// let children = []
//   // TODO: this isn't how we want to do it, I don't think
//   const thisPath = frontmatter.path.replace('/meta', '/')
//   for(let i=0;i<frontmatter.contents.length;i++) {
//     //TODO: treat child directories and child files differently
//     const childPath= frontmatter.contents[i].replace('./', '')
//     const childFrontmatter = await parseFrontmatter('/src/content/'+thisPath+childPath)

//     // check for contents in child
//     if(childFrontmatter.contents && childFrontmatter.contents.length>0) {
//       childFrontmatter.children = await findMemberFrontmatter(childFrontmatter)
//     } else {
//       childFrontmatter.children = []
//     }
//     children.push(childFrontmatter)
//   }
//   // console.log(children)
//   return children

async function findMemberFrontmatter(frontmatter:Frontmatter):Promise<Frontmatter[]> {
    const members:Frontmatter[] = []
    
    // first, clean relative paths in contents
    for(let i=0;i<frontmatter.contents.length;i++) {
        const parentDirectory:string = frontmatter.pathData.path.substring(0, frontmatter.pathData.path.lastIndexOf('/')) + '/'
        const memberPath:Path = validatePath(frontmatter.contents[i].replace('./', parentDirectory).replace('.md', ''))
        console.log('Parsing member frontmatter at', memberPath.path)
        members.push(await parseFrontmatter(memberPath))
    }
    
    // for(let i=0;i<members.length;i++) {
    //     members[i].parents = await findAndInheritFromParents(members[i]) 
    //     // ...but members don't need parents until you load their page
    // }
    return members
}

export type {Frontmatter, Path}
export {applyYAML, defaultFrontmatter, findAndInheritFromParents, findMemberFrontmatter}