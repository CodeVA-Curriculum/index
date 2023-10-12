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
    // if any of these are not defined in the query, the object matches that attribute
    let related:Frontmatter[] = frontmatters.filter((obj) => {
        return  filter.grade? isIntersecting(filter.grade, expandDashNotation(obj.grades)):true &&
                filter.subj?  isIntersecting(filter.subj, obj.subjects):true &&
                filter.aud?   isIntersecting(filter.aud, obj.audiences):true &&
                filter.type?  isIntersecting(filter.type, obj.types):true
    })

    // Filter `related` by params to find `results`
    // Standards filter 
    let results:Frontmatter[] = related.filter((obj) => {
        // If the object has standards and the filter defines them, match if intersecting
        if(obj.standards && filter.sol) {
            return isIntersecting(filter.sol, obj.standards)
        // If the filter defines standards but the object does not, do not match
        } else if(filter.sol) {
            return false
        // If the filter doesn't define standards, match the object regardless of its standards field
        } else {
            return true
        }
    })
    
    // Tags
    
    // Standard

    // Query

    // Sort `results` by type in resource, project, lesson order

    // Resort `results` by pulling titles including query to the top

    // Sort `related` by query text in body, title, or tags

    console.log("\nEnding with",related.length, "related")
    printTitles(related)
    console.log("\nEnding with", results.length, "results")
    printTitles(results)
    // console.log(frontmatters)
    
    return {
        results: "Test",
        related: "Another Test"
    }
}

function printTitles(l:Frontmatter[]) {
    for(let i=0;i<l.length;i++) { console.log(`    ${i+1}: ${l[i].title}`) }
}

export const prerender=true;