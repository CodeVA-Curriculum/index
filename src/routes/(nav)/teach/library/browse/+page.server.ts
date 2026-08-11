import type { PageServerLoad } from './$types';
import { getLocked } from '$lib/server'
import { db, elementRelations } from '$lib/server/db'
import * as schema from "$lib/server/db/schema"
import { eq } from 'drizzle-orm'

export const load:PageServerLoad = async ({ params, fetch, parent, locals }) => {
  // load & return library elements
  let { filters } = await parent()
  const elements = await db.query.element.findMany({
    with: elementRelations,
    where: {
      hidden: false
    }
  })
  const collections = await db.query.collection.findMany({
    with: { element: { with: elementRelations }}
  })
  for(const el of elements) {
    el.locked = getLocked(el.path, locals.accessCode)
  }
  return {
    filters,
    collections: collections,
    elements: elements
  }
}
