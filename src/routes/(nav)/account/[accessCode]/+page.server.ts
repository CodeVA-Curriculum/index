import * as auth from '$lib/server/auth';
import { makeCode } from '$lib/server/db'
import { eq, inArray } from 'drizzle-orm'
import { db } from '$lib/server/db'
import * as schema from '$lib/server/db/schema'
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import { logUserOut, logInWithCode, logInWithPortal } from '$lib/server'
import type { Actions, PageServerLoad } from './$types';
import { requireLogin } from '$lib/server'

export const load: PageServerLoad = async ({params, locals, parent}) => {
	const user = requireLogin()
	const { guides } = await parent()
	const [userCode] = await db.query.accessCode.findMany({
	  where: {
	    owner: user.id,
	    alias: params.accessCode
	  },
	  with: {
	    users: {
	    	with: {
	    		events: true,
	    		lastEvent: {
	    			limit: 1
	    		},
	    		completedProjects: true,
	    		completedNodes: true
	    	}
  		}
	  }
	})
	if(!userCode) { fail(404) }
	for(const guide of guides) {
		const guideUsers = userCode.users.filter((u) => {
			return u.events.filter((e) => e.navTo.includes(guide.path.replace('/meta.md', ''))).length
		})
		guide.userCount = guideUsers.length
	}

	for(const user of userCode.users) {
		// de-duplicate complete lists
		user.completedNodes = [...new Map(user.completedNodes.map(node => [node.id, node])).values()];
		user.completedProjects = [...new Map(user.completedProjects.map(proj => [proj.id, proj])).values()];

		// get all projects associated with nodes in the completedNodes array
		let nodeIds = []
		for(const cnode of user.completedNodes) { nodeIds.push(cnode.id) }
		const partiallyCompleteProjects = await db.query.project.findMany({
			with: {
				nodeGroups: {
					nodes: true
				},
				pivot: {
					nodeId: inArray(nodeIds)
				}
			}
		})

		user.projectPercents = {}
		for(const proj of partiallyCompleteProjects) {
			const pivotsComplete = proj.pivot.filter(o => nodeIds.includes(o.nodeId))
			user.projectPercents[proj.path] = Math.round((pivotsComplete.length / proj.pivot.length) * 100)
		}
	}
  return {
    user: user,
    session: locals.session,
    code: userCode,
    guides: guides
  }
};
