import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import YAML from 'yaml'

async function parseFrontmatter(path) {
    let frontmatter = {
      path: ''
    };
    // console.log(path.substring(1))
    const file = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter, ['yaml'])
      .use(() => (tree) => {
        frontmatter = YAML.parse(tree.children[0].value)
        frontmatter.path = path
      })
      .use(remarkRehype)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(await read(path.substring(1)))
    return frontmatter
  }

  export {parseFrontmatter}