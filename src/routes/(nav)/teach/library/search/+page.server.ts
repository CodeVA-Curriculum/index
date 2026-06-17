import type {PageLoad} from './$types'
import { db, elementRelations } from '$lib/server/db/index'
import type { Guide, Element } from '$lib/server/db/schema'
import * as schema from '$lib/server/db/schema'
import { guide } from '$lib/server/db/schema'

export const load:PageLoad = async ({ params }) => {
  // pull trail guides from database
  const elements:Elements[] = await db.query.element.findMany({
    with: elementRelations,
    where: {
      hidden: { eq: false}
    }
  })
  
  return {
    elements: elements
  }
}
