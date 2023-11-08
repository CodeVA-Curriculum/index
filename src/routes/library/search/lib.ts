import type { Frontmatter } from "$lib/utils/frontmatter";
import { expandDashNotation, expandSubjectsStrands } from "$lib/utils/metaUtils";

function isIntersecting(array1:string[], array2:string[]):boolean {
    let intersections = 0
        for(let i=0;i<array1.length;i++) {
            intersections += array2.includes(array1[i])? 1 : 0
        }
        // console.log(array1, array2, intersections > 0)
        return intersections > 0
}

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
        const score = longestCommonSubsequence(query.toLowerCase(), (objs[i].title as string)?.toLowerCase())
        objs[i].score = score
    }
    // Filter by lcs
    objs = objs.filter((obj) => {
        return obj.title?.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes((obj.title as string)?.toLowerCase()) || obj.score > obj.title.length/2
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

function printTitles(l:Frontmatter[]) {
    for(let i=0;i<l.length;i++) { console.log(`    ${i+1}: ${l[i].title}`) }
}

async function loadSearchResults(frontmatter:Frontmatter, filter:object) {

}

export function getFilter(params:URLSearchParams, meta:any):object {
    let filter:any = {}
    for(const [k,v] of params.entries()) {
        if(filter[k]) {
            filter[k].push(v)
        } else {
            filter[k] = [v]
        }
    }

    if(filter.grade) {
        filter.grade = expandDashNotation(filter.grade)
    }
    // expand subjects/strands
    if(filter.subj) {
        filter.subj = expandSubjectsStrands(filter.subj, meta.subjects)
    }
    return filter
}

export async function filterFrontmatter(filter:object, frontmatters:Frontmatter[]):Promise<object> {
    console.log("Starting with",frontmatters.length)

    // Grade, Subject, Audience, Resource Filter
    // if any of these are not defined in the query, the object matches that attribute
    let related:Frontmatter[] = frontmatters.filter((obj) => {
        // console.log(filter.subj)
        const is =  (filter.grade? isIntersecting(filter.grade, expandDashNotation(obj.grades)):true) &&
                (filter.subj?  isIntersecting(filter.subj, obj.subjects):true) &&
                (filter.aud?   isIntersecting(filter.aud, obj.audiences):true) &&
                (filter.type?  isIntersecting(filter.type, obj.types) : true) &&
                (filter.tags? isIntersecting(filter.tag, obj.tags) : true)
        // console.log(is)
        return is
    })

    // Filter `related` by params to find `results`
    // Standards filter 
    let results:Frontmatter[] = related.filter((obj) => {
        // If the object has standards and the filter defines them, match if intersecting
        if(obj.standards && filter.sol) {

            // match grade, subject, and strand standard group notation
            let matched = obj.standards.filter((str)=>{
                const tokens = str.split('.')
                // console.log(tokens)
                const grade = expandDashNotation([tokens[0]])
                let bandedStrs = []
                for(let i=0;i<grade.length;i++) {
                    const id = `${grade[i]}.${tokens[1]}` + (tokens.length > 2? `.${tokens[2]}` : '')
                    bandedStrs.push(id)
                }
                
                bandedStrs = bandedStrs.filter((str) => {
                    for(let i=0;i<filter.sol.length;i++) {
                        return filter.sol[i].includes(str)
                    }
                    return false 
                })
                return bandedStrs.length > 0
            })
            return isIntersecting(filter.sol, obj.standards) || matched.length > 0
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
        if(obj.tags && filter.tag) {
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
    results.sort((a,b) => {
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
    })

    if(filter.q) {
        // Query title (TODO: and body) filter for results
        results = results.filter((objs) => {
            return (objs.title as string).toLowerCase().includes((filter.q[0]).toLowerCase())
        })

        // Sort `results` by the length of the match in title (TODO: or body)
        results = scoreFilterAndSort(filter.q[0], results, 0.5)
        related = scoreFilterAndSort(filter.q[0], related, 0.3)
    }

    // Make sure nothing intersects between `related` and `results`
    related = related.filter((obj) => {
        const match = results.find((res) => obj.pathData.path == res.pathData.path)
        if(match) { return false } else { return true }
    })

    console.log("\nEnding with",related.length, "related")
    printTitles(related)
    console.log("\nEnding with", results.length, "results")
    printTitles(results)

    return {
        related: related,
        results: results
    }
}