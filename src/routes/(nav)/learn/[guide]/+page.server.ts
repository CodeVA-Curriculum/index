import { loadNodesForGuide, projectRelations } from '$lib/server/db'
import { nodeRelations } from '$lib/server/db'
import type {PageLoad} from './$types'
import { Project } from '$lib/components/guide/Project.svelte.ts'
import { fail } from '@sveltejs/kit'
import { db } from '$lib/server/db/index'
import type { Guide } from '$lib/server/db/schema'
import * as schema from '$lib/server/db/schema'
import { eq, or } from 'drizzle-orm'
import { error } from '@sveltejs/kit'
import { getGuideFromParam } from '$lib/server/db/utils'

export const load:PageLoad = async ({ params, locals }) => {
  console.log('Loading [guide]/+page.server.ts')
  const result:Guide = await getGuideFromParam(params.guide)

  const projects = await db.query.project.findMany({
    with: projectRelations,
    where: { guide: result.id }
  })
  // const nodes = await db.select().from(schema.node).where(eq(schema.node.guide, result.id))
  const nodes = await loadNodesForGuide(db, result.id, locals.user)
  let nodeIds = []
  for(const n of nodes) {
    nodeIds.push(n.id)
  }
  const edges = await db.query.edge.findMany({
    with: {
      toNode: true,
      fromNode: true
    },
    where: {
      guide: result.id
    }
  })

  return {
    guide: {
      ...result,
      pathTitle: params.guide,
      nodes: nodes,
      edges: edges,
      projects: projects
    }
  }
}
