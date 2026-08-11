import { loadNodesForGuide, projectRelations } from '$lib/server/db'
import { getLocked } from '$lib/server'
import { nodeRelations } from '$lib/server/db'
import type {PageLoad} from './$types'
import { Project } from '$lib/components/guide/Project.svelte.ts'
import { fail } from '@sveltejs/kit'
import { db } from '$lib/server/db/index'
import type { Guide } from '$lib/server/db/schema'
import * as schema from '$lib/server/db/schema'
import { eq, or } from 'drizzle-orm'
import { error } from '@sveltejs/kit'
import { getGuideFromParam } from '$lib/server/db/utils'

export const load:PageLoad = async ({ params, locals }) => {
  // console.log('Loading [guide]/+page.server.ts')
  const result:Guide = await getGuideFromParam(params.guide)

  const projects = await db.query.project.findMany({
    with: projectRelations,
    where: { guide: result.id }
  })
  const nodes = await loadNodesForGuide(db, result.id, locals.user)
  let nodeIds = []
  for(const n of nodes) {
    nodeIds.push(n.id)
  }
  const edges = await db.query.edge.findMany({
    with: {
      toNode: true,
      fromNode: true
    },
    where: {
      guide: result.id
    }
  })

  // await applyPermissions(nodes)
  await applyPermissions(projects, nodes, locals.accessCode)

  return {
    guide: {
      ...result,
      pathTitle: params.guide,
      nodes: nodes,
      edges: edges,
      projects: projects
    }
  }
}

async function applyPermissions(projects, nodes, accessCode) {
  // apply default scopes
  for(const el of projects) {
    el.locked = getLocked(el.path, accessCode)
    let projectNodes = []
    console.log(el.nodeGroups)
    for(const g of el.nodeGroups) {
      projectNodes = [...projectNodes, ...g.nodes]
    }
    for(let i=0;i<projectNodes.length;i++) {
      projectNodes[i] = projectNodes[i].path
    }
    for(const node of nodes) {
      node.locked = !projectNodes.includes(node.path)
    }
  }
}

