import {getStandards} from '../flat.json/lib'
import { json } from '@sveltejs/kit'

export async function GET({params}) {
    // TODO: optimize so we don't have to get all the standards and filter them
    const stds = await getStandards();
    const obj = stds.filter((obj) => obj.id == params.slug)
    return json(obj[0])
}

export const prerender = true;