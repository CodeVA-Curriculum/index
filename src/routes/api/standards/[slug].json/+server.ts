import {getStandards} from '../flat.json/lib'
import { json } from '@sveltejs/kit'

export async function GET({params}) {
    // TODO: optimize so we don't have to get all the standards and filter them
    const stds = await getStandards();
    const id = params.slug.split('.')
    if(id.length == 4 || id[0].includes('-')) {
        console.log("Getting standard at", params.slug)
        const obj = stds.filter((obj) => obj.id == params.slug)
        return json(obj[0])
    }

    // calling for a range of standards
    console.log("Got range call")
    return json("Called for unsupported range of standards")
}

export const prerender = true;