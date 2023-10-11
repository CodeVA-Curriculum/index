import type {Params} from '$lib/utils/searchUtils'
import { getAllFrontmatter, type Frontmatter } from '$lib/utils/frontmatter'
import { expandDashNotation } from '$lib/utils/metaUtils'

function isIntersecting(array1:string[], array2:string[]):boolean {
    let intersections = 0
        for(let i=0;i<array1.length;i++) {
            intersections += array2.includes(array1[i])? 1 : 0
        }
        // console.log(array1, array2, intersections > 0)
        return intersections > 0
}

export async function load({ url }){

    // Get params
    let filter:any = {
        grade: [],
        subj:[],
        aud:[],
        type:[]
    }
    for(const [k,v] of url.searchParams.entries()) {
        if(filter[k]) {
            filter[k].push(v)
        } else {
            filter[k] = [v]
        }
    }    

    // expand params grades
    if(filter.grade) {
        filter.grade = expandDashNotation(filter.grade)
    }


    // Import all the frontmatter
    let frontmatters = await getAllFrontmatter()
    // console.log(frontmatters)
    console.log(filter)

    console.log("Starting with",frontmatters.length)
    
    // Grade, Subject, Audience, Resource Filter
    let related:Frontmatter[] = frontmatters.filter((obj) => {
        return  isIntersecting(filter.grade, expandDashNotation(obj.grades)) &&
                isIntersecting(filter.subj, obj.subjects) &&
                isIntersecting(filter.aud, obj.audiences) &&
                isIntersecting(filter.type, obj.types)
    })

    // Filter `related` by params to find `results`
    let results:Frontmatter[]
    
    // Tags
    
    // Standard

    // Query

    // Sort `results` by type in resource, project, lesson order

    // Resort `results` by pulling titles including query to the top

    // Sort `related` by query text in body, title, or tags

    console.log("Ending with",frontmatters.length)
    // console.log(frontmatters)
    
    return {
        results: "Test",
        related: "Another Test"
    }
}

export const prerender=true;