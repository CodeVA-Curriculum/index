import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import YAML from 'yaml'
import { expandDashNotation } from './metaUtils'
import {h} from 'hastscript'
import {visit} from 'unist-util-visit'
import {nsfDirective} from './directives/nsf'
import { supporterDirective } from './directives/supporter'

import {applyYAML, defaultFrontmatter, findAndInheritFromParents, findMemberFrontmatter, auditFrontmatter, postprocess} from './frontmatter'
import type {Frontmatter, Path} from './frontmatter'



export async function parseFrontmatter(pathData:Path) {
    let frontmatter:Frontmatter = {} as Frontmatter// = defaultFrontmatter()
    
    let cleanPath = pathData.path
    if(cleanPath[0] == '/') {
      cleanPath = cleanPath.substring(1, cleanPath.length) as `${string}.md`
    }
    // console.log('src/content/'+cleanPath)
    const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (tree) => {
      frontmatter = applyYAML(tree.children[0].value, pathData)
      frontmatter.pathData = pathData
      frontmatter.vdoe = frontmatter.vdoe ? true : false
      
      // console.log(frontmatter)
    })
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(await read('src/content/'+cleanPath))

    return frontmatter;
}

export async function parseFile(pathData:Path, standards:object[]) {
  let frontmatter:Frontmatter = {} as Frontmatter// = defaultFrontmatter()
  const file = await unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ['yaml'])
  .use(() => (tree) => {
    frontmatter = applyYAML(tree.children[0].value, pathData)
    frontmatter.pathData = pathData
  })
  .use(remarkGfm)
  .use(remarkDirective)
  .use(nsfDirective)
  .use(supporterDirective)
  .use(remarkRehype)
  .use(rehypeFormat)
  .use(rehypeStringify)
  .process(await read('src/content/'+pathData.path))

  
  // Find parents of document or group
  frontmatter.parents = await findAndInheritFromParents(frontmatter);

  auditFrontmatter(frontmatter)

  // If element frontmatter doesn't have a `contents`field `members` will be an empty array
  frontmatter.members = await findMemberFrontmatter(frontmatter)
  
  
  // Post-processing
  frontmatter = await postprocess(frontmatter)

  // Render standards from API
  // if(frontmatter.standards) {
  //   for(let i=0;i<frontmatter.standards.length;i++) {
  //     // fill in standards if in aggregate mode
  //     frontmatter.standards[i] = standards.find((obj) => {
  //       return obj.id == frontmatter.standards[i]
  //     })
  //   }
  // }

  if(frontmatter.standards) {
    let split = frontmatter.standards
    let objs = []
  
    // expand grades notation
    for(let i=0;i<split.length;i++) {
        const tokens = split[i].split('.')
        const grades = expandDashNotation([tokens[0]])
        for(let g=0;g<grades.length;g++) {
            const obj = {
                name: split[i],
                grade: grades[g],
                subject: tokens[1],
                strand: tokens.length == 3? tokens[2]:false,
                id: tokens.length == 4? split[i]:false
            }
            objs.push(obj)
        }
    }

    // console.log(objs)

    // pull object from standards JSON
    // TODO: pull subsets from API to improve performance
    let stdStrings:string[] = []
    for(let i=0;i<objs.length;i++) {
        let newObj = standards.filter((obj) => {
            if(objs[i].id) {
                return obj.id == objs[i].id
            }
            const gradeMatch = obj.id.split('.')[0] == objs[i].grade
            const subjMatch = obj.id.split('.')[1] == objs[i].subject
            const strandToken = obj.id.split('.')[2]
            const strandMatch = objs[i].strand ? strandToken == objs[i].strand : true 
            return gradeMatch && subjMatch && strandMatch
        })
        for(let j=0;j<newObj.length;j++) {
            if(!stdStrings.includes(newObj[j].id)) {
                stdStrings.push(newObj[j].id)
            }
        }
    }

    let stdObjs = []
    for(let i=0;i<stdStrings.length;i++) {
        let obj = standards.filter((obj) => {
            return obj.id == stdStrings[i]
        })
        // assert(obj.length == 1)
        stdObjs.push(obj[0])
    }

    // console.log(objs)

    // frontmatter.standards = stdObjs
  }

  return {
    file: file,
    frontmatter: frontmatter
  };
}