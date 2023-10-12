export interface Standard {
    id:string,
    title:string,
    text:string,
    subs:string[],
    grade:string,
    strand:string,
    subject:string
}
export interface StrandsObject {
    'Algorithms & Programming'?:Standard[]
}
export interface SubjectsObject {
    'Computer Science'?:StrandsObject
}
export interface ListedStandards {
    [propname:string]:SubjectsObject
}
type GradeBand = `K-2`|`3-5`|`6-8`|`9-12`
export interface GradesByBand {
    "K-2":number[],
    "3-5":number[],
    "6-8":number[],
    "9-12":number[]
}
interface GradeByBandDisplay {
    [propname:string]:string[]
}

export const gradeList = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
export const fullGradeNames = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
export const standardsStrands = {
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

export function listedStdsToStdList(obj:ListedStandards):Standard[] {
    let list:Standard[] = []
    for(const band in obj) {
        for(const subj in obj[band]) {
            for(const strand in obj[band][[subj]]) {
                list = [...list, ...obj[band][subj][strand]]
            }
        }
    }
    return list
}


export function renderGradesAsStrings(grades:GradesByBand):GradeByBandDisplay {
    let gradesWithFullNames:GradeByBandDisplay = {}
    for(const gradeBand in grades) {
        const g = gradeBand as GradeBand
        gradesWithFullNames[g] = []
        for(let i=0;i<grades[g].length;i++) {
            gradesWithFullNames[g].push('')
            gradesWithFullNames[g][i] = fullGradeNames[grades[g][i]]
        }
    }
    return gradesWithFullNames
}

export function renderGradesAsIndices(grades:object) {
    for(const gradeBand in grades) {
        for(let i=0;i<grades[gradeBand].length;i++) {
            grades[gradeBand][i] = fullGradeNames.indexOf(grades[gradeBand][i])
        }
    }
    return grades
}

export function gradesByBandToList(grades:GradesByBand) {
    let gradeList = []
    for(const gradeBand in grades) {
        gradeList = [...gradeList, ...grades[gradeBand]]
    }
    return gradeList
} 

export function expandDashNotation(grades:string[]):string[] {
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
    return grades.filter(grade=>!grade.includes('-')) // remove dash item from array
}

// Assumes num
export function condenseDashNotation(grades:number[]):string[] {
    grades.sort((a,b) => a-b)
    let str = ""
    let list:string[] = []
    for(let i=0;i<grades.length;i++) {
        if(str=='') {
            str=gradeList[grades[i]].toString()+'-'
        }
        // see if next index is consecutive
        if(i < grades.length-1 && grades[i+1] == grades[i]+1) {
            // console.log('iterating...')
        } else {
            str+=gradeList[grades[i]]
            list.push(str)
            str = ''
        }
    }
    return list
}