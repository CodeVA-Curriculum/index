import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import YAML from 'yaml'

import {applyYAML, defaultFrontmatter, findAndInheritFromParents, findMemberFrontmatter, auditFrontmatter, postprocess} from './frontmatter'
import type {Frontmatter, Path} from './frontmatter'

export async function parseFrontmatter(pathData:Path) {
    let frontmatter:Frontmatter = {} as Frontmatter// = defaultFrontmatter()
    const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (tree) => {
      frontmatter = applyYAML(tree.children[0].value, pathData)
      frontmatter.pathData = pathData
      
      // console.log(frontmatter)
    })
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(await read('src/content/'+pathData.path))

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
  frontmatter = postprocess(frontmatter)

  // Render standards from API
  if(frontmatter.standards) {
    for(let i=0;i<frontmatter.standards.length;i++) {
      frontmatter.standards[i] = standards.find((obj) => {
        return obj.id == frontmatter.standards[i]
      })
    }
  }

  return {
    file: file,
    frontmatter: frontmatter
  };
}