import type {PageServerLoad} from './$types'
import { getGuideFromParam, getProjectsFromGuide } from '$lib/server/db/utils'
import { db } from '$lib/server/db/index'
import type { Guide } from '$lib/server/db/schema'
import { project } from '$lib/server/db/schema'

export const load:PageServerLoad = async ({ parent, params}) => {
  // Pull projects from db
  let { guide } = await parent()
  const projects = await getProjectsFromGuide(guide.id)
  return {
    projects: projects
  }
}
