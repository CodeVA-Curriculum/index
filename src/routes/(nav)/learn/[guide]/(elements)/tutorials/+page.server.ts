import type {PageServerLoad} from './$types'
import { getGuideFromParam, getProjectsFromGuide } from '$lib/server/db/utils'
import { db } from '$lib/server/db/index'
import type { Guide } from '$lib/server/db/schema'
import { node } from '$lib/server/db/schema'

export const load:PageServerLoad = async ({ parent}) => {
  // Pull projects from db
  // let { guide } = await parent()
  // const nodes = await getProjectsFromGuide(guide.id)
  return {
    nodes: []
  }
}
