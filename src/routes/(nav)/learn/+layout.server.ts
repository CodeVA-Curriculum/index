import type {PageLoad} from './$types'
import type { Actions } from './$types'
import { db } from '$lib/server/db/index'
import type { Guide } from '$lib/server/db/schema'
import { guide } from '$lib/server/db/schema'

export const load:PageLoad = async ({ params }) => {
  // pull trail guides from database
  const guides:Guide[] = await db.select().from(guide)
  guides.sort((a,b) => {
    a.title < b.title
  })
  return {
    guides: guides
  }
}
