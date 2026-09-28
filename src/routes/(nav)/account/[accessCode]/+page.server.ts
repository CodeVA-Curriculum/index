import * as auth from '$lib/server/auth';
import { makeCode } from '$lib/server/db'
import { eq } from 'drizzle-orm'
import { db } from '$lib/server/db'
import * as schema from '$lib/server/db/schema'
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import { logUserOut, logInWithCode, logInWithPortal } from '$lib/server'
import type { Actions, PageServerLoad } from './$types';
import { requireLogin } from '$lib/server'

export const load: PageServerLoad = async ({params, locals}) => {
	const user = requireLogin()
	const [userCode] = await db.query.accessCode.findMany({
	  where: {
	    owner: user.id,
	    alias: params.accessCode
	  },
	  with: {
	    users: {
	    	with: { lastEvent: {
	    		limit: 1
	    	}}
  		}
	  }
	})
	if(!userCode) { fail(404) }
	console.log(user)
  return {
    user: user,
    session: locals.session,
    code: userCode
  }
};
