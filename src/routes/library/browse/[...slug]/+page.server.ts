import {error} from '@sveltejs/kit'
import { parseFile } from '$lib/utils/parsers'
import { importLibraryGlob } from '$lib/utils/index.js'
import type {Path} from '$lib/utils/frontmatter'
import {validatePath} from '$lib/utils/frontmatter'
import {base} from '$app/paths'

import type {Element} from '$lib/utils/elementTypes'

export async function load({ params, fetch }):Promise<Element> {
  // console.log(params.slug)
  const path:Path = validatePath(params.slug)
  if(path.exists) {
    const standards = await (await fetch(`${base}/api/standards/flat.json`)).json()
    const data = await parseFile(path, standards)
    
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
  console.log("Prerendering dynamic routes")
  const paths = await importLibraryGlob('all')
  let cleanPaths = []
  for(const path in paths) {
    // exclude 'meta' files from prerendered paths
    if(path.includes('meta')) {
      const clean = path.slice("/src/content/".length, -1*('meta.md'.length + 1))
      cleanPaths.push({
        slug: clean
      })  
    } else {
      const clean = path.slice("/src/content/".length, -3)
      cleanPaths.push({
        // Add non-meta.md path to prerendered paths, excluding the '.md' file extension
        slug: clean
      })
    }
  }
  
  return cleanPaths;
}

export const prerender = true;