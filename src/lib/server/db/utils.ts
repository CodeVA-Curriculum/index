import { error } from '@sveltejs/kit'
import { projectRelations } from '$lib/server/db'
import { db } from '$lib/server/db/index'
import * as schema from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'

export async function initiateTestSession() {
  // TODO: create a new session for a fake user
}

export async function getGuideFromParam(param:string){
  const searchPath = `${param}/meta.md`
  const result:Guide[] = await db.select().from(schema.guide).where(eq(schema.guide.path, searchPath))
  if(result.length != 1) {
    error(404, "No guide matches this url!")
  }
  return result[0]
}

export async function getProjectsFromGuide(guideId:number) {
  return await db.query.project.findMany({
    with: projectRelations,
    where: {
      guide: guideId
    }
  })
}
export function expandDashNotation(fmGrade:string|number):string[] {
    fmGrade = String(fmGrade)
    // console.log("Expanding ", fmGrade)
    const gradeList = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'MS', 'HS']
    // split grades along commas
    const grades = fmGrade.replace(' ', '').split(',')
    // process dash notation
    for(let i=0;i<grades.length;i++) {
        if(grades[i].includes('-')) {
            const first:number = gradeList.indexOf(grades[i].substring(0, grades[i].indexOf('-')))
            const last:number  = gradeList.indexOf(grades[i].substring(grades[i].indexOf('-')+1, grades[i].length)) + 1
            for(let i=first;i<last;i++) {
                if(!grades.includes(gradeList[i])) {
                    grades.push(String(gradeList[i]))
                }
            }
        }
    }
    // console.log(grades)
    return [...grades.filter(grade=>!grade.includes('-')) ]// remove dash item from array
}
