import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import YAML from 'yaml'

import {applyYAML, defaultFrontmatter, findAndInheritFromParents, findMemberFrontmatter} from './frontmatter'
import type { Frontmatter, Path } from "./frontmatter"

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

    // console.log(frontmatter)

    // If element frontmatter has a `contents`field (i.e., is a group), find member elements
    if(frontmatter.contents) {
      frontmatter.members = await findMemberFrontmatter(frontmatter)
    } else {
      frontmatter.members = []
    }
    // console.log("finished parsing members")

    return {
      file: file,
      frontmatter: frontmatter,
      type: pathData.path.includes('meta') ? 'group' : 'document',
    };
}