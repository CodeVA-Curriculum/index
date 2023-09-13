import { importLibraryGlob } from '$lib/utils/index.js'
import { parseFrontmatter } from '$lib/utils/parsers'
import type { Path } from '$lib/utils/frontmatter'

// TODO: load data from api/library/ API route based on parameters
export async function load({ params }){
    // TODO: refactor to not use vite
    const library = await importLibraryGlob('all')
    let results = []
    for(const path in library) {
        const pathData:Path = {
            path: path.substring(path.lastIndexOf('/src/content/')+'/src/content/'.length, path.length) as '${string}.md',
            exists: true
        }
        results.push(await parseFrontmatter(pathData))
    }
    // console.log('Printing frontmatter from search page...')
    // console.log(results)
    return {
        results: results
    }
  }