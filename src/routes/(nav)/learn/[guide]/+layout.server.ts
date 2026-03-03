import type {PageLoad} from './$types'
import { db } from '$lib/server/db/index'
import type { Guide } from '$lib/server/db/schema'
import * as schema from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'
import { error } from '@sveltejs/kit'

export const load:PageLoad = async ({ params }) => {
  const searchPath = `${params.guide}/meta.md`
  const result:Guide[] = await db.select().from(schema.guide).where(eq(schema.guide.path, searchPath))
  if(result.length != 1) {
    error(404, "No guide matches this url!")
  }

  const projects = await db.select().from(schema.project).where(eq(schema.project.guide, result[0].id)).orderBy(schema.project.difficulty)
  const nodes = await db.select().from(schema.node).where(eq(schema.node.guide, result[0].id))

  // TODO: construct the reactive objects from the database objects
  // Relational query for nodes, edges, and projects based on guide
  // const nodes = await db.select().from(schema.node).where(eq(schema.node.guide == result[0].id))
  // const edges = await db.select().from(schema.edge).where(eq(schema.edge.guide == result[0].id))
  // const projects = await db.select().from(schema.project).where(eq(schema.project.guide == result[0].id))
  return {
    guide: {
      ...result[0],
      pathTitle: params.guide,
      nodes: nodes,
      edges: [],
      projects: projects
    }
  }
}
