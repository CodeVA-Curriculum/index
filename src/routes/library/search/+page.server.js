import { importLibraryGlob } from '$lib/utils/index.js'
import { parseFrontmatter } from '$lib/utils/libParse.js'

export async function load({ params }){
    const library = await importLibraryGlob('all')
    let results = []
    for(const path in library) {
        results.push(await parseFrontmatter(path))
    }
    // console.log('Printing frontmatter from search page...')
    // console.log(results)
    return {
        results: results
    }
  }