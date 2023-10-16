import {json} from '@sveltejs/kit'
import { fullGradeNames } from '$lib/utils/metaUtils.js'

let standards:object[] = []

async function getStandards() {
    let stds:object[] = []
    const files = await import.meta.glob('./**/*.json')
    for (const path in files) {
        await files[path]().then((mod:any) => {
            stds = [...stds, ...mod.default]
        })
    }
    return stds
}

standards = await getStandards()

// TODO: sort standards (check this periodically as you add standards)
standards.sort((a,b) => {
    return fullGradeNames.indexOf(a.grade) - fullGradeNames.indexOf(b.grade)
})

// console.log(standards)


interface Params {
    grades:string[]
}

function applyField(field:string, obj:any, from:any, toApply:any):object {
    if(!obj[from[field]]) {
        obj[from[field]] = toApply
    }
    // console.log(obj)
    return obj
}

// TODO: (eventually?) accept params so we only get a subset of the standards based on what's in the library
export function GET({ url }) {

    if(url.searchParams.get('format') == 'flat') {
        return json(standards)
    }

    
    let stds = {}
    for(let i=0;i<standards.length;i++) {
        stds =  applyField('grade', stds, standards[i], {})
        for(const grade in stds) {
            // console.log(grade)
            stds[grade] = applyField('subject', stds[grade], standards[i], {})
            for(const subject in stds[grade]) {
                if(standards[i].grade == grade && standards[i].subject == subject) {
                    stds[grade][subject] = applyField('strand', stds[grade][subject], standards[i], [])
                }
                for(const strand in stds[grade][subject]) {
                    stds[grade][subject][strand] = standards.filter((obj) => {
                        return obj.grade == grade && obj.subject == subject && obj.strand == strand
                    })
                }
            }
        }
    }
	return json(stds)
}

export const prerender = true