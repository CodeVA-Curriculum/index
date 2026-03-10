import type {PageServerLoad} from './$types'
import { getGuideFromParam, getProjectsFromGuide } from '$lib/server/db/utils'
import { db } from '$lib/server/db/index'
import type { Guide } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'
import * as schema from '$lib/server/db/schema'
import type { Node } from '$lib/server/db/schema'

export const load:PageServerLoad = async ({ parent}) => {
  // Pull projects from db
  let { guide } = await parent()
  // const nodes = await getProjectsFromGuide(guide.id)
  const nodes:schema.Node[]   = await db.select().from(schema.node).where(eq(schema.node.guide, guide.id))
  // const result:Guide[] = await db.select().from(schema.guide).where(eq(schema.guide.path, searchPath))
  return {
    nodes: nodes
  }
}
