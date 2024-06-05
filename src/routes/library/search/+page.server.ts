import type {Params} from '$lib/utils/searchUtils'
import { getAllFrontmatter, type Frontmatter } from '$lib/utils/frontmatter'
import { expandDashNotation, expandSubjectsStrands } from '$lib/utils/metaUtils'
import {base} from '$app/paths'



export async function load({ fetch }){

    // Import library metadata
    const meta = await(await fetch('/api/library/meta.json')).json()

    // Import all the frontmatter
    let frontmatters = await getAllFrontmatter()
    
    return {
        frontmatter: frontmatters,
        meta: meta
    }
}

export const prerender=true;