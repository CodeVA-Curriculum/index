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
	const code = await db.query.accessCode.findFirst({
	  where: {
	    alias: params.accessCode,
	    owner: user.id
	  }
	})
	const [res] = await db.query.user.findMany({
	  where: {
	    username: params.userName,
	    codeId: code.id
	  }
	  // with: {
	  //   // TODO: add relations for analytics
	  // }
	})
	if(!res) { fail(404) }
	console.log(res)
  return {
    user: user,
    res: res,
    session: locals.session,
  }
};
