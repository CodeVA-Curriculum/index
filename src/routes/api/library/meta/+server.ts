import { getAllFrontmatter } from "$lib/utils/frontmatter";
import type {Frontmatter} from '$lib/utils/frontmatter'
import {json} from '@sveltejs/kit'
import { gradeList, expandDashNotation } from "$lib/utils/metaUtils";
import { base } from '$app/paths'

interface Params {
    grade:`band`|`list`,
    subject:`band`|`list`
}

export async function GET({ fetch }) {

    const frontmatters:Frontmatter[] = await getAllFrontmatter()
    const standardsStrands = await (await fetch(`${base}/api/standards/course-strand-map.json`)).json()

    // Get all metadata
    let subjects:string[] = []
    let grades:(string)[] = []
    let types:string[] = []
    let audiences:string[] = []
    let tags:string[] = []

    for(let i=0;i<frontmatters.length;i++) {
        subjects = aggregate(frontmatters[i].subjects, subjects) as string[]
        grades = aggregate(frontmatters[i].grades, grades) as string[]
        types = aggregate(frontmatters[i].types, types) as string[]
        audiences = aggregate(frontmatters[i].audiences, audiences) as string[]
        tags = aggregate(frontmatters[i].tags, tags) as string[]
    }
    grades = expandDashNotation(grades)
    
    // convert grades from strings to numbers
    let gradesAsNumbers = []
    for(let i=0;i<grades.length;i++) {
        gradesAsNumbers[i] = gradeList.indexOf(grades[i])
    }
    gradesAsNumbers.sort((a,b) => a-b)

    // console.log("Subjects:", subjects)

    // Arrange subjects & strands into object
    // Don't add subject unless there are strands to go with it
    let results = {}
    let subjToAdd:string[] = []
    for(let i=0;i<subjects.length;i++) {
        // Add subject indices to results object
        const subjOfStrand:string|false = isStrand(subjects[i], standardsStrands)
        if(isSubj(subjects[i], standardsStrands)) {
            // results[subjects[i]] = []
            subjToAdd.push(subjects[i])
        } else if(subjOfStrand && !results[subjOfStrand]) {
            results[subjOfStrand] = []
            results[subjOfStrand].push(subjects[i]) 
        } else if(subjOfStrand && results[subjOfStrand]) {
            results[subjOfStrand].push(subjects[i])
        }
    }

    // console.log("Results:", results)

    // Arrange grades into bands
    let gradeResults:any;
    // if(routeParams.grade == "band") {
    gradeResults = {
        'K-2': gradesAsNumbers.slice(0, 3),
        '3-5': gradesAsNumbers.slice(3, 6),
        '6-8': gradesAsNumbers.slice(6, 9),
        '9-12': gradesAsNumbers.slice(9-13)
    }
    // } else {
    //     gradeResults = gradesAsNumbers
    // }

    return json({
        subjects: results,
        grades: gradeResults,
        types: types,
        audiences: audiences,
        tags:tags
    })
}

function isStrand(name:string, standardsStrands:object):string|false {
    for(const subj in standardsStrands) {
        if(standardsStrands[subj].includes(name)) {
            return subj
        }
    }
    return false
}

function isSubj(name:string, standardsStrands:object) {
    if(standardsStrands[name]) {
        return true
    } else {
        return false
    }
}

function aggregate(input:(string | number)[], aggregatedValues:(string|number)[]):(string | number)[] {
    for(let i=0;i<input.length;i++) {
        if(!aggregatedValues.includes(input[i])) {
            // console.log('found new element', input[i], aggregatedValues)
            aggregatedValues.push(input[i])
        }
    }
    return aggregatedValues
}

export const prerender = true;