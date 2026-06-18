import type {PageLoad} from './$types'
import { db, elementRelations } from '$lib/server/db/index'
import type { Guide, Element } from '$lib/server/db/schema'
import * as schema from '$lib/server/db/schema'
import { guide } from '$lib/server/db/schema'

export const load:PageLoad = async ({ url, params }) => {
  let elements:Elements[]= []
  const query = url.searchParams.get("q").toLowerCase()
  const grades = url.searchParams.get("grades") // TODO connect to frontend so I don't have to type this as a literal

  console.log("Search event", {
    query: query,
    grades: grades
  })
  // const grades = url.searchParams.get("Grades(s)")
  if(query) {
    elements = await db.query.element.findMany({
      with: elementRelations,
      where: {
        hidden: { eq: false},
        OR: [
          { title: { like: "%"+query+"%"}},
          { short: { like: `%${query}%`}},
          { long: { like: `%${query}%`}},
          { content: { like: `%${query}%`}}
        ]
      }
    })

  }

  // load subjects, grades, audiences, types
  // const grades = await db.select().from(schema.grade)
  // const subjects = await db.select().from(schema.subject)
  // const audiences = await db.select().from(schema.audience)
  // const types = await db.select().from(schema.elementType)
  // const tags = await db.select().from(schema.tag)
  // const elements:Elements[] = await db.query.element.findMany({
  //   with: elementRelations,
  //   where: {
  //     hidden: { eq: false}
  //   }
  // })
  
  return {
    elements: elements
  }
}

