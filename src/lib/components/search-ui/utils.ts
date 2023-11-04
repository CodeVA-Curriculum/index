import { condenseDashNotation } from "$lib/utils/metaUtils"
import { fullGradeNames } from "$lib/utils/metaUtils"

export interface Params {
    aud?:string[],
    type?:string[]
    tag?:string[]
    sol?:string[],
    subj?:string[],
    grade?:string[]
}

function arrayToParams(url:URLSearchParams, key:string, items:string[]):URLSearchParams {
    for(let i=0;i<items.length;i++) {
        url.append(key, items[i])
    }
    return url
}

export function generateParams(params:Params):URLSearchParams {

    // Condense grade
    // Convert display names to numbers
    let shortNames:number[] = []
    let gradeList = params.grade ? params.grade : []
    for(let i=0;i<gradeList.length;i++) {
        const index = fullGradeNames.indexOf(gradeList[i])
        if(index >= 0) { // Filter out grade band (e.g., 'K-2')
            shortNames.push(index)
        }
    }
    // Convert contiguous sequences of grades to dash notation
    if(shortNames.length > 0) {params.grade = condenseDashNotation(shortNames)}

    // craft parameter URL based on params
    let url = new URLSearchParams()
    for(const [key, value] of Object.entries(params)) {
        if(key.length > 0) { url = arrayToParams(url, key, value)}
    }
    return url
}