export interface Standard {
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
    Kindergarten?:SubjectsObject
}
export interface GradesByBand {
    "K-2":(string|number)[],
    "3-5":(string|number)[],
    "6-8":(string|number)[],
    "9-12":(string|number)[]
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


export function renderGradesAsStrings(grades:GradesByBand) {
    for(const gradeBand in grades) {
        for(let i=0;i<grades[gradeBand].length;i++) {
            grades[gradeBand][i] = fullGradeNames[grades[gradeBand][i]]
        }
    }
    return grades
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