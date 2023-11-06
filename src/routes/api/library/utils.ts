import type { Frontmatter } from "$lib/utils/frontmatter"
import { getSubjectsInKey } from "$api/utils"
import { expandDashNotation, gradeList, fullGradeNames } from "$lib/utils/metaUtils"

export function aggregate(input:(string | number)[], aggregatedValues:(string|number)[]):(string | number)[] {
    for(let i=0;i<input.length;i++) {
        if(!aggregatedValues.includes(input[i])) {
            // console.log('found new element', input[i], aggregatedValues)
            aggregatedValues.push(input[i])
        }
    }
    return aggregatedValues
}

export function getAudiences(fm:Frontmatter[]) {
    let audiences:string[] = []
    for(let i=0;i<fm.length;i++) {
        audiences = aggregate(fm[i].audiences, audiences) as string[]
    }
    return audiences
}

export function getResources(fm:Frontmatter[]) {
    let resources:string[] = []
    for(let i=0;i<fm.length;i++) {
        resources = aggregate(fm[i].types, resources) as string[]
    }
    return resources
}

export async function getSubjects(fm:Frontmatter[]) {
    const subjects = await getSubjectsInKey()

    let metaSubjects:string[] = []
    fm.filter((obj) => {
        for(let i=0;i<subjects.length;i++) {
            if(obj.subjects.includes(subjects[i]) && !metaSubjects.includes(subjects[i])) {
                // `${obj.title} includes ${subjects[i]}`
                metaSubjects.push(subjects[i])
            }
        }
        return false
    })
    return metaSubjects
}
export function getGrades(fm:Frontmatter[]) {
    let grades:string[] = []
    for(let i=0;i<fm.length;i++) {
        grades = aggregate(fm[i].grades, grades) as string[]
    }
    grades = expandDashNotation(grades)

    // convert grades to numbers for sorting
    let gradesAsNumbers:(string|number)[] = []
    for(let i=0;i<grades.length;i++) {
        gradesAsNumbers[i] = gradeList.indexOf(grades[i]) as number
    }
    gradesAsNumbers.sort((a,b) => (a as number) - (b as number))

    // put grade names back
    for(let i=0;i<gradesAsNumbers.length;i++) {
        gradesAsNumbers[i] = fullGradeNames[gradesAsNumbers[i] as number] as string
    }

    // organize by grade band
    const obj = {
        'K-2': gradesAsNumbers.slice(0, 3),
        '3-5': gradesAsNumbers.slice(3, 6),
        '6-8': gradesAsNumbers.slice(6, 9),
        '9-12': gradesAsNumbers.slice(9-13)
    }
    return obj
}

export function getTags(fm:Frontmatter[]) {
    let tags:string[] = []
    for(let i=0;i<fm.length;i++) {
        tags = aggregate(fm[i].tags, tags) as string[]
    }
    return tags
}