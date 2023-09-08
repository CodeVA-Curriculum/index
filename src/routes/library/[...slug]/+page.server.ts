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
import { parseFrontmatter, findMemberFrontmatter, parseFile } from '$lib/utils/libParse.js'
import {validatePath} from '$lib/utils/libraryUtils'
import { importLibraryGlob } from '$lib/utils/index.js'

import type {Element} from '$lib/utils/elementTypes'

export async function load({ params }):Promise<Element> {
  const path = validatePath(params.slug)
  if(path.exists) {
    const data = await parseFile(path.path)
    return {
      content: data.file.toString(),
      metadata: data.frontmatter,
      path: data.path,
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
        slug: path.slice("/src/content/".length, -3)
      })
    }
  }
  return cleanPaths;
}

export const prerender = true;