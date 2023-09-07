import { parseFrontmatter } from '$lib/utils/libParse.js'

export async function load({ params }){
    const library = await import.meta.glob('$content/**/*.md')
    let results = []
    for(const path in library) {
        results.push(await parseFrontmatter(path))
    }
    console.log('Printing frontmatter from search page...')
    console.log(results)
    return {
        results: results
    }
  }