import { error } from '@sveltejs/kit'
import type {PageLoad} from './$types'
import { db, elementRelations } from '$lib/server/db/index'
import * as schema from '$lib/server/db/schema'
import { read } from 'to-vfile'

export const load:PageLoad = async ({ params }) => {
  // pull requested file from db based on path
   const res = await db.query.element.findFirst({
     with: elementRelations,
     where: {
       path: params.path
     }
   })
   if(!res) { error(404, 'File not found')}

   // Group standards by subject

  return {
    element: res,
    path: params.path,
  }
}
 
