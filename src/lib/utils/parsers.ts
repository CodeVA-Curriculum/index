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
    frontmatter.members = []
  }
  
  // Post-processing
  // console.log(frontmatter)

  // split subjects by comma
  if(typeof(frontmatter.subjects) == typeof('string')) {
    // @ts-ignore TODO: figure out how to make the types play nice
    frontmatter.subjects = frontmatter.subjects.split(', ')
  }
  if(typeof(frontmatter.grades) == typeof('string')) {
    // @ts-ignore TODO: figure out how to make the types play nice
    frontmatter.grades = frontmatter.grades.split(', ')
  }
  if(typeof(frontmatter.types) == typeof('string')) {
    // @ts-ignore TODO: figure out how to make the types play nice
    frontmatter.types = frontmatter.types.split(', ')
  }

  return {
    file: file,
    frontmatter: frontmatter
  };
}