import type { Frontmatter } from '$lib/utils/frontmatter'
import { FilterSet, searchLibrary } from '$lib/utils/searchUtils'
import {json} from '@sveltejs/kit'

export async function GET({url}) {
    let filters:FilterSet = new FilterSet(url.searchParams)
    const results:Frontmatter[] = await searchLibrary(filters)
    console.log('Got results from query:',results)
    return json(results)
}