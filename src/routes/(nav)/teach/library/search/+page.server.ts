import type {PageLoad} from './$types'
import { db, elementRelations } from '$lib/server/db/index'
import type { Guide, Element } from '$lib/server/db/schema'
import * as schema from '$lib/server/db/schema'
import { guide } from '$lib/server/db/schema'

export const load:PageLoad = async ({ url, params }) => {
  let elements:Elements[]= []
  const query = url.searchParams.get("q").toLowerCase()
  if(query) {
    console.log("Search event", query)
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
    console.log(`Found ${elements.length} elements`)

  }
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

