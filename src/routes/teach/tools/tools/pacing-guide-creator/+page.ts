import { getFilter, filterFrontmatter } from '../../../lib/components/pacing-guide/util.js'
import { json } from '@sveltejs/kit'

export async function load({ url, fetch }) {
    // Import library metadata
    const meta = await(await fetch('https://curriculum.codevirginia.org/api/library/meta.json')).json()
    const frontmatters = await(await fetch('https://curriculum.codevirginia.org/api/library/all.json')).json()
    return { 
        frontmatters: frontmatters,
        meta: meta 
    }
}