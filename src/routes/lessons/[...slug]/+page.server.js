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

async function parseFrontmatter(path) {
  let frontmatter;
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

async function parseFile(path) {
  let frontmatter;
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (tree) => {
      frontmatter = YAML.parse(tree.children[0].value)
      frontmatter.path = path
    })
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(await read('src/content/'+path+'.md'))

    // TODO: if the file is not a group, find its parents
    const possibleParents = await import.meta.glob('$content/**/meta.md')
    let actualParents = []
    for(const parent in possibleParents) {
      const parentFrontmatter = await parseFrontmatter(parent)
      for(let i=0;i<parentFrontmatter.contents.length;i++) {
        const parentPath = parentFrontmatter.path
        const docName = parentFrontmatter.contents[i].replace('./', parentPath.substring(0, parentPath.indexOf('/meta.md'))+'/')
        if(docName == '/src/content/'+path+'.md') {
          console.log('Found parent at', parentPath)
          // get parent object info
          possibleParents[parentPath]().then((obj) => {
            actualParents.push({
              ...obj.metadata,
              path: parentPath.substring('/src/content/'.length, parentPath.length-'meta.md'.length),
              // content: obj.default
            })
          })
        }
      }
    }
    // console.log(actualParents)
    frontmatter.parents = actualParents;

    return {
      file: file,
      frontmatter: frontmatter,
      type: path.includes('meta') ? 'group' : 'document',
    };
}

export async function load({ params }){
  const path = validatePath(params.slug)
  if(path) {
    const data = await parseFile(path)
    console.log(data.frontmatter.parents)
    return {
      content: data.file.toString(),
      metadata: data.frontmatter,
      path: data.path
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