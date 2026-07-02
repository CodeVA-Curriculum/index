import type {PageServerLoad} from './$types'
import { nodeRelations } from '$lib/server/db'
import { db } from '$lib/server/db/index'
import type { Guide } from '$lib/server/db/schema'
import { node} from '$lib/server/db/schema'

export const load:PageServerLoad = async ({ parent}) => {
  // Pull projects from db
  let { guide } = await parent()
  const nodes = await db.query.node.findMany({
    with: nodeRelations,
    where: {
      guide: guide.id
    }
  })

  return {
    guide: {
      ...guide,
      nodes: nodes
    }
  }
}
