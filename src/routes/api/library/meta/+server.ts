import { getAllFrontmatter } from "$lib/utils/frontmatter";
import type {Frontmatter} from '$lib/utils/frontmatter'
import {json} from '@sveltejs/kit'

export async function GET() {
    const frontmatters:Frontmatter[] = await getAllFrontmatter()

    // Get subjects & grades
    let subjects:string[] = []
    let grades:(string | number)[] = []

    for(let i=0;i<frontmatters.length;i++) {
        // TODO: anything else we want in this route
        subjects = aggregate(frontmatters[i].subjects, subjects)
        grades = aggregate(frontmatters[i].grades, grades)
    }

    let results = {}
    for(let i=0;i<subjects.length;i++) {
        // Add subject indices to results object
        const strand:string|false = isStrand(subjects[i])
        if(isSubj(subjects[i])) {
            results[subjects[i]] = []
        } else if(strand && !results[strand]) {
            results[strand] = []
            results[strand].push(subjects[i]) 
        } else if(strand && results[strand]) {
            results[strand].push(subjects[i])
        }
    }
    const gradeResults = {
        'K-2': grades.slice(0, 3),
        '3-5': grades.slice(3, 6),
        '6-8': grades.slice(6, 9),
        '9-12': grades.slice(9-12)
    }


    return json({
        subjects: results,
        grades: gradeResults
    })
}

const standardsStrands = {
    "Computer Science": [
        "Algorithms & Programming",
        "Data & Analysis",
        "Computing Systems",
        "Impacts of Computing",
        "Networks & the Internet",
        "Cybersecurity"
    ],
    "Mathematics": [
        "Probability & Statistics"
    ]
}

function isStrand(name:string):string|false {
    for(const subj in standardsStrands) {
        if(standardsStrands[subj].includes(name)) {
            return subj
        }
    }
    return false
}

function isSubj(name:string) {
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