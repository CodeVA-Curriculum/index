// import type { Frontmatter } from "./frontmatter";
// import { expandDashNotation, expandSubjectsStrands } from "./metaUtils";

interface Frontmatter {
    title:string|null,
    authors:string,
    pathData:Path,
    subjects:string[],
    types:string[],
    grades:string[],
    children:Frontmatter[]
    parents:Frontmatter[],
    members:Frontmatter[],
    groups:Frontmatter[],
    contents:string[],
    license?:License,
    tags:string[],
    audiences:string[],
    standards:string[],
    links:Links,
    image:string,
    vdoe:boolean
}

interface Path {
    path:`${string}.md`,
    exists:boolean
}

interface License {
    name:string,
    link:string
}

interface Links {
    goopen?:string,
    drive?:string,
    pdf?:string,
    ext?:string
}


export interface Standard {
    id:string,
    title:string,
    text:string,
    subs:string[],
    grade:string,
    strand:string,
    subject:string,
    course:string
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

export const gradeList = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'MS', 'HS']
export const fullGradeNames = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Middle School Courses', 'High School Courses']

// TODO: pull this from the API, dummy! 
// These should all be API routes
// export const standardsStrands = {
//     "Computer Science": [
//         "Algorithms & Programming",
//         "Data & Analysis",
//         "Computing Systems",
//         "Impacts of Computing",
//         "Networks & the Internet",
//         "Cybersecurity"
//     ],
//     "Mathematics": [
//         "Probability & Statistics"
//     ],
//     "Science": [
//         "Scientific & Engineering Practices",
//         "Force, Motion, & Energy",
//         "Matter",
//         "Living Systems & Processes",
//         "Earth & Space Systems",
//         "Earth Resources"
//     ]
// }

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
    // console.log(grades)
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

export async function getThumbnail(driveLink:string):Promise<string|false> {
    let id = driveLink.substring(driveLink.indexOf('/d/') + 3)
    id = id.substring(0, id.indexOf('/'))
    
    let exists = false

    if(id != 'tps:') {
        const res = await fetch("/thumbnails/" + id + '.png', { method: 'HEAD' })
        exists = res.ok
    }

    if(exists) {
        return "/thumbnails/" + id + '.png'
    }
    return false
}

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
        const is =  (filter.grade? isIntersecting(filter.grade, expandDashNotation(obj.grades)):true) &&
                (filter.subj?  isIntersecting(filter.subj, obj.subjects):true) &&
                (filter.aud?   isIntersecting(filter.aud, obj.audiences):true) &&
                (filter.type?  isIntersecting(filter.type, obj.types) : true) &&
                (filter.tags? isIntersecting(filter.tag, obj.tags) : true)
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
        const order = ['Unit of Study', 'Lesson Plan', 'Curricular Resource']
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

    // If a "Lesson Plan" type element appears in `results` alongside its parent, remove the element
    // let parentPaths:string[] = []
    // for(const result of results) {
    //     if(result.contents && result.contents.length > 0) {
    //         parentPaths.push("/" + result.pathData.path)
    //     }
    // }
    // console.log(parentPaths)
    // results = results.filter((obj) => {
    //     // const foundParent = obj.parents.find((parent) => parentPaths.includes(parent.pathData.path))
    //     const isLesson = obj.types.includes("Lesson Plan") && !obj.contents
    //     return !isLesson
    // })

    // Truncate `related` to 10 maximum items
    related = related.splice(0, 10)

    console.log("\nEnding with",related.length, "related")
    printTitles(related)
    console.log("\nEnding with", results.length, "results")
    printTitles(results)

    return {
        related: related,
        results: results
    }
}