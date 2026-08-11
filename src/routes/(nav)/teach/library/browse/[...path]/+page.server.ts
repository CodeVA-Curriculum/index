import { error } from '@sveltejs/kit'
import { getLocked } from '$lib/server'
import type {PageLoad} from './$types'
import { db, elementRelations } from '$lib/server/db/index'
import * as schema from '$lib/server/db/schema'
import { read } from 'to-vfile'

export const load:PageLoad = async ({ params, locals, parent }) => {
    let { filters } = await parent()
  // pull requested file from db based on path
   const res = await db.query.element.findFirst({
     with: elementRelations,
     where: {
       path: params.path
     }
   })
   if(!res) { error(404, 'File not found')}

   // lock children
   async function lockChildren(obj, generation) {
     if(generation > 2) {
       return { groups: [], docs: []}
     }
     let groups = []
     let docs = []
     obj.locked = getLocked(obj.path, locals.accessCode)
     if(obj.children && obj.children.length > 0) {
       for(let i=0;i<obj.children.length;i++) {
         obj.children[i] = await db.query.element.findFirst({
           with: elementRelations,
           where: {
             path: obj.children[i].path
           }
         })
         obj.children[i].locked = getLocked(obj.children[i].path, locals.accessCode)
         if(obj.children[i].children?.length > 0) {
           groups.push(obj.children[i])
           const r = await lockChildren(obj.children[i], generation? generation+1 : 1)
           groups = [...groups, ...r.groups]
           docs = [...docs, ...r.docs]
         } else {
           docs.push(obj.children[i])
         }
       }
     }
     return {
       groups: groups,
       docs: docs
     }
   }

   const { groups, docs } = await lockChildren(res, 0)


  return {
    element: res,
    children: [...groups, ...docs],
    path: params.path,
    filters: filters
  }
}
 
