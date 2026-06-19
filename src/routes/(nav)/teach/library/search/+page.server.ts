import type {PageLoad} from './$types'
import { db, elementRelations } from '$lib/server/db/index'
import type { Guide, Element } from '$lib/server/db/schema'
import * as schema from '$lib/server/db/schema'
import { guide } from '$lib/server/db/schema'

export const load:PageLoad = async ({ url, params }) => {
  let elements:Elements[]= []
  const query = url.searchParams.get("q")?.toLowerCase()
  const grades = [...url.searchParams.getAll("grade")] // TODO connect to frontend so I don't have to type this as a literal
  const audiences = [...url.searchParams.getAll("audience")]
  const subjects = [...url.searchParams.getAll("subject")]
  const standards = [ ...url.searchParams.getAll("sol")]
  const tags = [...url.searchParams.getAll("tag")]
  const types = [...url.searchParams.getAll("type")]

  console.log("Search event", {
    query: query,
    grades: grades,
    audiences: audiences,
    subjects: subjects,
    standards: standards,
    tags: tags,
    types: types
  })
  // const grades = url.searchParams.get("Grades(s)")
  const gradesFilter = getIdFilter(grades)
  const audiencesFilter = getIdFilter(audiences)
  const subjectsFilter = getIdFilter(subjects)
  const typesFilter = getIdFilter(types)
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
        ],
        grades: {
          OR: gradesFilter
        },
        subjects: {
          OR: subjectsFilter
        },
        audiences: {
          OR: audiencesFilter 
        },
        types: {
          OR: typesFilter
        }
        // TODO: standards, tags
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
  console.log(`Found ${elements.length} elements`)
  return {
    elements: elements
  }
}
function getIdFilter(ids:string[]):Number[] {
  let filterIds:Number[] = []
  for(const id of ids) {
    filterIds.push({
      id: Number(id)
    })
  }
  return filterIds
}
