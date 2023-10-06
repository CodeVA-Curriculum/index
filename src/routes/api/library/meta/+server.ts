import { getAllFrontmatter } from "$lib/utils/frontmatter";
import type {Frontmatter} from '$lib/utils/frontmatter'
import {json} from '@sveltejs/kit'
import { gradeList, standardsStrands } from "$lib/utils/metaUtils";

export async function GET() {
    const frontmatters:Frontmatter[] = await getAllFrontmatter()

    // Get subjects & grades
    let subjects:string[] = []
    let grades:(string)[] = []

    for(let i=0;i<frontmatters.length;i++) {
        // TODO: anything else we want in this route
        subjects = aggregate(frontmatters[i].subjects, subjects) as string[]

        // TODO: preprocess grades results to get it in the right format & to support different kinds of notation
        grades = aggregate(frontmatters[i].grades, grades) as string[]
    }

    // process dash notation
    for(let i=0;i<grades.length;i++) {
        if(grades[i].includes('-')) {
            const first:number = gradeList.indexOf(grades[i].substring(0, grades[i].indexOf('-')))
            const last:number  = gradeList.indexOf(grades[i].substring(grades[i].indexOf('-')+1, grades[i].length)) + 1
            for(let i=first;i<last;i++) {
                if(!grades.includes(gradeList[i])) {
                    grades.push(gradeList[i])
                }
            }
        }
    }
    grades = grades.filter(grade=>!grade.includes('-')) // remove dash item from array
    
    // convert grades from strings to numbers
    let gradesAsNumbers = []
    for(let i=0;i<grades.length;i++) {
        gradesAsNumbers[i] = gradeList.indexOf(grades[i])
    }

    console.log(gradesAsNumbers)

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
        'K-2': gradesAsNumbers.slice(0, 3),
        '3-5': gradesAsNumbers.slice(3, 6),
        '6-8': gradesAsNumbers.slice(6, 9),
        '9-12': gradesAsNumbers.slice(9-12)
    }


    return json({
        subjects: results,
        grades: gradeResults
    })
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