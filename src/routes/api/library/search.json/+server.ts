import { json } from "@sveltejs/kit";
import { getFilter, filterFrontmatter } from '$lib/utils/search';
import { base } from '$app/paths'

export async function GET({ url, fetch }) {
    const meta = await(await fetch('/api/library/meta.json')).json()
    const fm = await (await fetch (`${base}/api/library/all.json`)).json()
    
    let filter = getFilter(url.searchParams, meta)
    const res = await filterFrontmatter(filter, fm)
    
    return json({
        results: res.results,
        related: res.related
    })
    // return json('Hello')
}

export const prerender = true;