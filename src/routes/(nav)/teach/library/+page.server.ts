import { redirect } from '@sveltejs/kit';
export const load:PageServerLoad = async ({ params, fetch, parent }) => {
  // load & return library elements
  // let { filters } = await parent()
  // const elements = await db.query.element.findMany({
  //   with: elementRelations,
  //   where: {
  //     hidden: false
  //   }
  // })
  // const collections = await db.query.collection.findMany({
  //   with: { element: { with: elementRelations }}
  // })
  // return {
  //   filters,
  //   collections: collections,
  //   elements: elements
  // }
  redirect(307, '/teach/library/browse')
}
