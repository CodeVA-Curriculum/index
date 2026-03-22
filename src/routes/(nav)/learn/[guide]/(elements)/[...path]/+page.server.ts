import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db/index'
import { eq, and } from 'drizzle-orm'
import * as schema from '$lib/server/db/schema'
import { getGuideFromParam } from '$lib/server/db/utils'
// Construct the map and load it in
export const load: LayoutServerLoad = async ({ params, parent, url }) => {
  const { guide } = await parent();
  const searchPath = url.toString().substring(url.toString().indexOf("/learn/")+"/learn/".length)
  // console.log(searchPath)
  let results = []
  let elType:string
  if(params.path.includes("projects")) {
    // search for a project
    results = await db.select().from(schema.project).where(and(
      eq(schema.project.guide, guide.id),
      eq(schema.project.path, searchPath)
    ))
    elType = "project"
  } else {
    // search for a Node
    results = await db.select().from(schema.node).where(and(
      eq(schema.node.guide, guide.id),
      eq(schema.node.path, searchPath)
    ))
    elType = "node"
  }
  if(results.length == 0) {
    return error(404, "File not found!")
  }
	return {
	  element: results[0],
	  type: elType
	};
};
