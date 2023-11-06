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
    const obj = stds.filter((obj) => {
        const iid = obj.id.split('.')

        // TODO: support dash notation
        
        if(id.length == 1) {
            return iid[0] == id[0]
        } else if(id.length == 2) {
            return iid[0] == id[0] && iid[1] == id[1]
        } else if(id.length == 3) {
            return iid[0] == id[0] && iid[1] == id[1] && iid[2] == id[2]
        } else {
            throw new Error(`Should have found standard ${params.slug} but did not!`)
        }
    })
    // console.log(obj)
    return json(obj)
}

export const prerender = true;