import type {PageServerLoad} from './$types'
import { getGuideFromParam, getProjectsFromGuide } from '$lib/server/db/utils'
import { db } from '$lib/server/db/index'
import type { Guide } from '$lib/server/db/schema'
import { node, project } from '$lib/server/db/schema'

export const load:PageServerLoad = async ({ parent, params}) => {
  // Pull projects from db
  let { guide } = await parent()
  const projects = await db.query.project.findMany({
    with: { pivot: true, nodeGroups: { with: { nodes: true }}},
    where: { guide: guide.id }
  })
  const edges = await db.query.edge.findMany({
    with: {
      toNode: true,
      fromNode: true
    }
  })
  const nodes = await db.select().from(node).where(node.guide == guide.id)

  return {
    guide: {
      ...guide,
      nodes: nodes,
      edges: edges,
      projects: projects
    }
  }
}
