import type {PageLoad} from './$types'
import { Project } from '$lib/components/guide/Project.svelte.ts'
import { db } from '$lib/server/db/index'
import type { Guide } from '$lib/server/db/schema'
import * as schema from '$lib/server/db/schema'
import { eq, or } from 'drizzle-orm'
import { error } from '@sveltejs/kit'
import { getGuideFromParam } from '$lib/server/db/utils'

export const load:PageLoad = async ({ params }) => {
  console.log('Loading [guide]/+page.server.ts')
  const result:Guide = await getGuideFromParam(params.guide)

  const projects = await db.query.project.findMany({
    with: { nodeGroups: { with: { nodes: true }}},
    where: { guide: result.id }
  })
  const edges = await db.query.edge.findMany({
    with: {
      toNode: true,
      fromNode: true
    }
  })
  const nodes = await db.select().from(schema.node).where(eq(schema.node.guide, result.id))

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
