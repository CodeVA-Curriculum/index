import { expandDashNotation } from '$lib/utils/metaUtils';
import {getStandards} from '../flat.json/lib'
import { json } from '@sveltejs/kit'

export async function GET({params}) {
    // TODO: optimize so we don't have to get all the standards and filter them
    const stds = await getStandards();
    const id = params.slug.split('.')
    if(id.length == 4 && !id[0].includes('-')) {
        // console.log("Getting standard at", params.slug)
        const obj = stds.filter((obj) => obj.id == params.slug)
        // console.log(obj)
        return json(obj)
    }

    // calling for a range of standards
    // console.log("Got range call")
    const obj = stds.filter((obj) => {
        const iid = obj.id.split('.')

        // support dash notation
        let grades = [id[0]]
        if(id[0].includes('-')) {
            grades = expandDashNotation([id[0]])
        }
        
        if(id.length == 1) {
            return grades.includes(iid[0])
        } else if(id.length == 2) {
            return grades.includes(iid[0]) && iid[1] == id[1]
        } else if(id.length == 3) {
            return grades.includes(iid[0]) && iid[1] == id[1] && iid[2] == id[2]
        } else {
            throw new Error(`Should have found standard ${params.slug} but did not!`)
        }
    })
    // console.log(obj)
    return json(obj)
}

export async function entries() {
    let routes = []
    const res = await getStandards()
    for(let i=0;i<res.length;i++) {
        const tokens = res[i].id.split('.')
        routes.push({slug: tokens[0]})
        routes.push({slug: `${tokens[0]}.${tokens[1]}`})
        routes.push({slug: `${tokens[0]}.${tokens[1]}.${tokens[2]}`})
        routes.push({ slug: res[i].id} )
        // console.log("Prerendering", res[i].id)
    }
    return routes
}

export const prerender = true;