import { getAllFrontmatter } from "$lib/utils/frontmatter"
import { filterFrontmatter, getFilter } from "$lib/utils/search"
import { json } from "@sveltejs/kit"

export async function GET({ url, fetch }) {
    // Import library metadata
    const meta = await(await fetch('/api/library/meta.json')).json()

    // Import all the frontmatter
    let frontmatters = await getAllFrontmatter()
    let filter = getFilter(url.searchParams, meta)

    const res:any = await filterFrontmatter(filter, frontmatters)
        
    return json({
        results: res.results,
        related: res.related
    })
}


export const prerender = true