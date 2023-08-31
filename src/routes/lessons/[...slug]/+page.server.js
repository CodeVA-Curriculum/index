import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import YAML from 'yaml'
import {error} from '@sveltejs/kit'
import * as fs from 'fs'

function validatePath(path) {
  if(fs.existsSync(`src/content/${path}.md`)) {
    return path
  } else if(fs.existsSync(`src/content/${path}/meta.md`)) {
    return path+'/meta'
  } else {
    return false
  }
}

async function parseFile(path) {
  let frontmatter;
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (tree) => {
      frontmatter = YAML.parse(tree.children[0].value)
    })
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(await read('src/content/'+path+'.md'))

    return {
      file: file,
      frontmatter: frontmatter,
      type: path.includes('meta') ? 'group' : 'document'
    };
}

export async function load({ params }){
  const path = validatePath(params.slug)
  if(path) {
    const data = await parseFile(path)
    return {
      content: data.file.toString(),
      metadata: data.frontmatter
    }
  } else {
    throw error(404, {
      message: 'Not found'
    });
  }
}

// entries  
export async function entries() {
  const paths = import.meta.glob('$content/**/*.md')
  let cleanPaths = []
  for(const path in paths) {
    // exclude 'meta' files from prerendered paths
    if(path.includes('meta')) {
      cleanPaths.push({
        slug: path.slice("/src/content/".length, -1*'meta.md'.length)
      })  
    } else {
      cleanPaths.push({
        slug: path.slice("/src/content/".length, -3)
      })
    }
  }
  return cleanPaths;
}

export const prerender = true;