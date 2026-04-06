import type {PageServerLoad} from './$types'
import { db } from '$lib/server/db/index'
import type { Guide } from '$lib/server/db/schema'
import { node} from '$lib/server/db/schema'

export const load:PageServerLoad = async ({ parent}) => {
  // Pull projects from db
  let { guide } = await parent()
  const nodes = await db.select().from(node).where(node.guide == guide.id)

  return {
    guide: {
      ...guide,
      nodes: nodes
    }
  }
}
