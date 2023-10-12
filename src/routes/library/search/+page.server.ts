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

function match(query:string, obj:Frontmatter) {

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

    // Tags filter
    results = results.filter((obj) => {
        // If the object has tags and the filter defines them, match if intersecting
        if(obj.tags && filter.tats) {
            return isIntersecting(filter.tag, obj.tags)
        // If the filter defines tags but the object does not, do not match
        } else if(filter.tag) {
            return false
        // If the filter doesn't define tags, match the object regardless of its tags field
        } else {
            return true
        }
    })

    

    // Sort `results` by type in resource, project, lesson order
    // results.sort((a,b) => {
    //     const order = ['Lesson Plan', 'Unit of Study', 'Curricular Resource']
    //     let typeScoreA = 0
    //     let typeScoreB = 0
    //     for(let i=0;i<a.types.length;i++) {
    //         const score = order.indexOf(a.types[i])
    //         if(typeScoreA < score) { typeScoreA = score }
    //     }
    //     for(let i=0;i<b.types.length;i++) {
    //         const score = order.indexOf(b.types[i])
    //         if(typeScoreB < score) { typeScoreB = score }
    //     }
    //     return typeScoreA - typeScoreB
    // })
    function longestCommonSubsequence(a:string, b:string):number {
        const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(0));
        for(let i = 1; i < a.length + 1; i++) {
            for(let j = 1; j < b.length + 1; j++) {
                if(a[i-1] === b[j-1]) {
                    matrix[i][j] = 1 + matrix[i-1][j-1];
                } else {
                    matrix[i][j] = Math.max(matrix[i-1][j], matrix[i][j-1]);
                }
            }
        }
        return matrix[a.length][b.length];
    }
    function scoreFilterAndSort(query:string, objs:Frontmatter[], threshold:number):Frontmatter[] {
        for(let i=0;i<objs.length;i++) {
            const score = longestCommonSubsequence(query.toLowerCase(), objs[i].title?.toLowerCase())
            objs[i].score = score
            // console.log("Score:",score)
        }
        // Filter by lcs
        objs = objs.filter((obj) => {
            return (obj.score / obj.title.length) > threshold
        })
        objs.sort((a,b) => {
            if(b.score == a.score) {
                // Sort by resource type
                const order = ['Lesson Plan', 'Unit of Study', 'Curricular Resource']
                let typeScoreA = 0
                let typeScoreB = 0
                for(let i=0;i<a.types.length;i++) {
                    const score = order.indexOf(a.types[i])
                    if(typeScoreA < score) { typeScoreA = score }
                }
                for(let i=0;i<b.types.length;i++) {
                    const score = order.indexOf(b.types[i])
                    if(typeScoreB < score) { typeScoreB = score }
                }
                return typeScoreA - typeScoreB
            } else {
                // Sort by longest common subsequence
                return b.score - a.score
            }
        })
        return objs
    }

    if(filter.query[0]) {
        // Query title (TODO: and body) filter for results
        results = results.filter((objs) => {
            return objs.title.toLowerCase().includes((filter.query[0]).toLowerCase())
        })

        // Sort `results` by the length of the match in title (TODO: or body)
        results = scoreFilterAndSort(filter.query[0], results, 0.5)
        related = scoreFilterAndSort(filter.query[0], related, 0.3)
    }

    console.log("\nEnding with",related.length, "related")
    printTitles(related)
    console.log("\nEnding with", results.length, "results")
    printTitles(results)
    // console.log(frontmatters)
    
    return {
        results: results,
        related: related
    }
}

function printTitles(l:Frontmatter[]) {
    for(let i=0;i<l.length;i++) { console.log(`    ${i+1}: ${l[i].title}`) }
}

export const prerender=true;