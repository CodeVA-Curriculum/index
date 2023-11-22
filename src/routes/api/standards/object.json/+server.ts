import {json} from '@sveltejs/kit'
import { fullGradeNames } from '$lib/utils/metaUtils.js'
import {base} from '$app/paths'


interface Params {
    grades:string[]
}

function applyField(field:string, obj:any, from:any, toApply:any):object {
    if(!obj[from[field]]) {
        obj[from[field]] = toApply
    }
    if(!from[field]) { console.log(from) }
    return obj
}

// TODO: (eventually?) accept params so we only get a subset of the standards based on what's in the library
export async function GET({fetch}) {
    const standards = await (await fetch(`${base}/api/standards/flat.json`)).json()
    
    // TODO: sort standards (check this periodically as you add standards)
    standards.sort((a,b) => {
        return fullGradeNames.indexOf(a.grade) - fullGradeNames.indexOf(b.grade)
    })
    let stds = {}
    for(let i=0;i<standards.length;i++) {
        stds =  applyField('grade', stds, standards[i], {})
        for(const grade in stds) {
            if(standards[i].grade === grade) {
                stds[grade] = applyField('course', stds[grade], standards[i], {})
                for(const subject in stds[grade]) {
                    if(standards[i].grade == grade && standards[i].course == subject) {
                        stds[grade][subject] = applyField('strand', stds[grade][subject], standards[i], [])
                    }
                    for(const strand in stds[grade][subject]) {
                        stds[grade][subject][strand] = standards.filter((obj) => {
                            return obj.grade == grade && obj.course == subject && obj.strand == strand
                        })
                    }
                }
            }
        }
    }

    // Organize course information
    stds.courseToSubjectMap = {}
    for(let i=0;i<standards.length;i++) {
        if(!stds.courseToSubjectMap[standards[i].course]) {
            stds.courseToSubjectMap[standards[i].course] = standards[i].subject
        }
    }
    // console.log(stds["Middle School Courses"]["Middle School CS Elective"])
	return json(stds)
}

export const prerender = true