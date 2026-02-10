import type {PageLoad} from './$types'
import { db } from '$lib/server/db/index'
import type { Guide, Element } from '$lib/server/db/schema'
import * as schema from '$lib/server/db/schema'
import { guide } from '$lib/server/db/schema'

export const load:PageLoad = async ({ params }) => {
  // pull trail guides from database
  const elements:Element[] = await db.select().from(schema.element)
  
  return {
    elements: elements
  }
}
