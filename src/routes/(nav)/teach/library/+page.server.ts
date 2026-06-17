import type { PageServerLoad } from './$types';
import { db, elementRelations } from '$lib/server/db'
import * as schema from "$lib/server/db/schema"
import { eq } from 'drizzle-orm'

export const load:PageServerLoad = async ({ params, fetch }) => {
  // load & return library elements
  const elements:Elements[] = await db.query.element.findMany({
    with: elementRelations,
    where: {
      hidden: { eq: false}
    }
  })
  const collections = await db.query.collection.findMany({
    with: { element: { with: elementRelations }}
  })
  // const collections = await db.select().from(schema.collection)
  return {
    elements: elements,
    collections: collections
  }
}
