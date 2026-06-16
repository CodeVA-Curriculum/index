import { db, elementRelations } from '$lib/server/db'
import type { Actions } from './$types'
import * as schema from "$lib/server/db/schema"
import { eq, inArray } from 'drizzle-orm'
import type { Element } from '$lib/server/db/schema'

export async function load({ event, locals, url }) {
  // const elements:Element[] = await db.query.element.findMany({
  //   where: {
  //     hidden: { eq: false}
  //   }
  // })
  // const activities = await db.query.activity.findMany({
  //   with: { standards: true }
  // })
  const standards = await db.query.standard.findMany({
    with: {
      grade: true,
      subject: true
    }
  })
  standards.sort((a,b) => a.gradeId - b.gradeId)


  return {
    standards: standards
  }
}

export const actions = {
  load: async (event) => {
    // TODO: load carousel items
    const form = await event.request.formData()
    const standardIds = (JSON.parse(form.get("ids"))).ids
    const rowIndex = Number(form.get("rowIndex"))
    console.log("Getting activities for IDs", standardIds)
    const result = await db.select().from(schema.activity).innerJoin(schema.activityToStandard, inArray(schema.activityToStandard.standardId, standardIds)).innerJoin(schema.standard, inArray(schema.standard.id, standardIds))
    let addedIds = []
    let activities = []
    for(const res of result) {
      const actObj = res.activity      
      actObj.standards = []
      for(const p of result) {
        const pivot = p.activity_to_standard
        const standard = p.standard
        if(!actObj.standards.includes(pivot.standardId)) { actObj.standards.push(p.standard) }
      }
      activities.push(actObj)
    }
    return { success: {
      rowIndex: rowIndex,
      activities: activities
    }}
  }
} satisfies Actions;
