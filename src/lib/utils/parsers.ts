import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import YAML from 'yaml'

import {applyYAML, defaultFrontmatter, findAndInheritFromParents, findMemberFrontmatter, auditFrontmatter} from './frontmatter'
import type {Frontmatter, Path} from './frontmatter'

export async function parseFrontmatter(pathData:Path) {
    let frontmatter:Frontmatter = defaultFrontmatter()
    const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (tree) => {
      frontmatter = applyYAML(tree.children[0].value, pathData)
      frontmatter.pathData = pathData
    })
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(await read('src/content/'+pathData.path))

    return frontmatter;
}

export async function parseFile(pathData:Path) {
  let frontmatter:Frontmatter = defaultFrontmatter()
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

  // console.log(frontmatter)
  // Find parents of document or group
  frontmatter.parents = await findAndInheritFromParents(frontmatter);

  auditFrontmatter(frontmatter)

  // If element frontmatter has a `contents`field (i.e., is a group), find member elements
  if(frontmatter.contents) {
    frontmatter.members = await findMemberFrontmatter(frontmatter)
  } else {
    console.log(frontmatter.pathData.path, 'has no members')
    frontmatter.members = []
  }
  
  // Post-processing
  console.log(frontmatter)

  // split fields by comma
  frontmatter.subjects = splitString(frontmatter.subjects, ', ')
  frontmatter.grades = splitString(frontmatter.grades, ', ')
  frontmatter.types = splitString(frontmatter.types, ', ')
  frontmatter.tags = splitString(frontmatter.tags, ', ')

  return {
    file: file,
    frontmatter: frontmatter
  };
}

function splitString(string:any, separator:string):any[] {
  let list = []
  if(typeof(string) == typeof('string')) {
    list = string.split(separator)
  } else {
    throw new Error(`Tried to split frontmatter ${string} attribute of incorrect data type!`)
  }
  return list
}