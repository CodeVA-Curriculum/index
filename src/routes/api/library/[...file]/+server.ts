import { json } from '@sveltejs/kit';
import {error} from '@sveltejs/kit'
import { parseFile } from '$lib/utils/parsers'
import { importLibraryGlob } from '$lib/utils/index.js'
import type {Path} from '$lib/utils/frontmatter'
import {validatePath} from '$lib/utils/frontmatter'
import {base} from '$app/paths'
import type {Element} from '$lib/utils/elementTypes'

export async function GET({ params, fetch }) {
    const path:Path = validatePath(params.file)
    if(path.exists) {
        const standards = await (await fetch(`${base}/api/standards/flat.json`)).json()
        
        // TODO: avoid pulling in all the standards--we don't need all the info until the user clicks on the pill element in the Standards Box
        const data = (await parseFile(path, standards) as unknown)
        
        return json({
            content: data.file.toString(),
            frontmatter: data.frontmatter,
            type: data.type
        })
    } else {
        throw error(404, {
        message: 'Not found'
        });
    }
}

export const prerender = true;

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