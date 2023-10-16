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
import { parseFrontmatter, findMemberFrontmatter } from '$lib/utils/libParse.js'
import { parseFile } from '$lib/utils/parsers'
// import {validatePath} from '$lib/utils/libraryUtils'
import { importLibraryGlob } from '$lib/utils/index.js'
import type {Path} from '$lib/utils/frontmatter'
import {validatePath} from '$lib/utils/frontmatter'

import type {Element} from '$lib/utils/elementTypes'

export async function load({ params }):Promise<Element> {
  console.log(params.slug)
  const path:Path = validatePath(params.slug)
  if(path.exists) {
    const data = await parseFile(path)
    // console.log('loaded:')
    // console.log(data)
    return {
      content: data.file.toString(),
      frontmatter: data.frontmatter,
      type: data.type
    }
  } else {
    throw error(404, {
      message: 'Not found'
    });
  }
}

// entries  
export async function entries() {
  // TODO: refactor to use fs instead of vite importing--it would be better to have the content outside of `src`
  const paths = await importLibraryGlob('all')
  let cleanPaths = []
  for(const path in paths) {
    // exclude 'meta' files from prerendered paths
    if(path.includes('meta')) {
      cleanPaths.push({
        slug: path.slice("/src/content/".length, -1*'meta.md'.length)
      })  
    } else {
      cleanPaths.push({
        // Add non-meta.md path to prerendered paths, excluding the '.md' file extension
        slug: path.slice("/src/content/".length, -3)
      })
    }
  }
  return cleanPaths;
}

export const prerender = true;