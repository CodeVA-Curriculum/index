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
  // console.log(result)

  const projects = await db.select().from(schema.project).where(eq(schema.project.guide, result.id)).orderBy(schema.project.difficulty)
  // console.log(projects[0])
  const projectEdges = await db.select().from(schema.nodeToNodeGroup).leftJoin(schema.project, eq(schema.nodeToNodeGroup.projectId, schema.project.id)).leftJoin(schema.node, eq(schema.nodeToNodeGroup.nodeId, schema.node.id)).leftJoin(schema.nodeGroup, eq(schema.nodeToNodeGroup.groupId, schema.nodeGroup.id)).where(eq(schema.project.guide, result.id))

  // TODO: assemble project objects as needed, not sure about this yet. Gonna work on rendering edges first.

  // TODO: load edges from canvas and compare
  // const edges = await db.select().from(schema.edge).leftJoin(schema.node, or(eq(schema.edge.to, schema.node.id), eq(schema.edge.from, schema.node.id))).where(eq(schema.edge.guide, result.id))
  const edges = await db.query.edge.findMany({
    with: {
      toNode: true,
      fromNode: true
    }
  })
  
  const nodes = await db.select().from(schema.node).where(eq(schema.node.guide, result.id))
  // console.log(nodes)
  // TODO: construct the reactive objects from the database objects
  // Relational query for nodes, edges, and projects based on guide
  // const nodes = await db.select().from(schema.node).where(eq(schema.node.guide == result.id))
  // const edges = await db.select().from(schema.edge).where(eq(schema.edge.guide == result.id))
  // const projects = await db.select().from(schema.project).where(eq(schema.project.guide == result.id))
  console.log('EDGES')
  console.log(edges[0])
  return {
    guide: {
      ...result,
      pathTitle: params.guide,
      nodes: nodes,
      edges: edges,
      projectEdges: projectEdges,
      projects: projects
    }
  }
}
