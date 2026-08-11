import type {PageServerLoad} from './$types'
import { getLocked } from '$lib/server'
import { nodeRelations } from '$lib/server/db'
import { db } from '$lib/server/db/index'
import type { Guide } from '$lib/server/db/schema'
import { node} from '$lib/server/db/schema'

export const load:PageServerLoad = async ({ parent, locals}) => {
  // Pull projects from db
  let { guide } = await parent()
  const nodes = await db.query.node.findMany({
    with: nodeRelations,
    where: {
      guide: guide.id
    }
  })
  for(const node of nodes) {
    node.locked = getLocked(node.path, locals.accessCode)
  }
  nodes.sort((a,b) => !a.locked && b.locked ? -1 : 0)
  // el.locked = getLocked(el.path, accessCode)

  return {
    guide: {
      ...guide,
      nodes: nodes
    }
  }
}
