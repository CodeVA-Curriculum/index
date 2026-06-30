import type { LayoutServerLoad } from './$types'
import * as schema from '$lib/server/db/schema'
import { db } from '$lib/server/db'
export const load:LayoutServerLoad = async () => {
  // load library categories & filter data
  const grades = await db.select().from(schema.grade)
  const audiences = await db.select().from(schema.audience)
  const subjects = await db.select().from(schema.subject)
  const tags = await db.select().from(schema.tag)
  const elementTypes = await db.select().from(schema.elementType)

  
  return {
    filters: {
      grades: grades,
      audiences: audiences,
      subjects: subjects,
      tags: tags,
      elementTypes: elementTypes
    }
  }
}
