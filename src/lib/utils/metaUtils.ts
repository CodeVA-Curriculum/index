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

export function getGradeNums(grades:string[]):number[] {
    let nums:number[] =[]
    for(let i=0;i<grades.length;i++) {
        nums.push(gradeList.indexOf(grades[i]))
    }
    return nums
}

// Assumes num
export function condenseDashNotation(grades:number[]):string[] {
    grades.sort((a,b) => a-b)
    let str = gradeList[grades[0]]
    let list:string[] = []
    let inRange = false
    for(let i=0;i<grades.length;i++) {
        str.length == 0? str=gradeList[grades[i]] : str=str
        // if we are in a range of grades, check if next is consecutive
        if(i < grades.length-1 && grades[i+1] == grades[i]+1) {
            // next grade is consecutive, continue
            !(str.indexOf('-') == str.length-1)? str+='-' : str+=''
            continue
        } else {
            // next grade is not consecutive or we are at the end of the list. Add grade to str if ending in dash, then push
            (str.indexOf('-') == str.length -1)? list.push(str+=gradeList[grades[i]]) : list.push(gradeList[grades[i]])
            str=''
        }
    }
    return list
}

export function expandSubjectsStrands(start:string[], items:object):string[] {
    let startSubj:string[] = []
    for(let i=0;i<start.length;i++) {
        // console.log(subjects.start[i].includes('All'))
        if(start[i].includes('All')) {
            // console.log('adding strands...')
            const subjName = start[i].substring(4, start[i].length)
            // console.log("Items",subjects.items[subjName])
            if(items[subjName]) {
                for(let j=0;j<items[subjName].length;j++) {
                    startSubj.push(items[subjName][j])
                }
                start[i] = start[i].substring(4, start[i].length)
            }
        }
    }
    return [...start, ...startSubj]
}