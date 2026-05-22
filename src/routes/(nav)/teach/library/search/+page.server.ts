import type {PageLoad} from './$types'
import { db } from '$lib/server/db/index'
import type { Guide, Element } from '$lib/server/db/schema'
import * as schema from '$lib/server/db/schema'
import { guide } from '$lib/server/db/schema'

export const load:PageLoad = async ({ params }) => {
  // pull trail guides from database
  const elements:Elements[] = await db.query.element.findMany({
    with: {
      subjects: true,
      types: true,
      audiences: true,
      standards: true,
      tags: true,
      grades: true,
      children: true,
    },
    where: {
      hidden: { eq: false}
    }
  })
  
  return {
    elements: elements
  }
}
