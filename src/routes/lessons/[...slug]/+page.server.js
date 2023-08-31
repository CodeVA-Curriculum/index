import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import YAML from 'yaml'

export async function load({ params }){
  let frontmatter;
  // console.log(params)
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (tree) => {
      frontmatter = YAML.parse(tree.children[0].value)
      // console.log(frontmatter)
    })
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(await read('src/content/'+params.slug+'.md'))

  return {
    content: file.toString(),
    metadata: frontmatter
  }

}

// entries  
export async function entries() {
  const paths = import.meta.glob('$content/**/*.md')
  let cleanPaths = []
  for(const path in paths) {
    cleanPaths.push({
      slug: path.slice("/src/content/".length, -3)
    })
  }
  return cleanPaths;
}

export const prerender = true;