import * as auth from '$lib/server/auth';
import { makeCode } from '$lib/server/db'
import { eq } from 'drizzle-orm'
import { db } from '$lib/server/db'
import * as tables from '$lib/server/db/schema'
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import { logUserOut, logInWithCode } from '$lib/server'
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
	const user = requireLogin()
  let userCodes = []
  console.log(locals.user, locals.session)
  // if(locals.user && !locals.session.codeId) {
  //   console.log("Account logged in, getting access codes...")
  //   userCodes = await db.query.accessCode.findMany()
  // } else if(locals.session.codeId) {
  //   let [res] = await db.select().from(tables.accessCode).where(eq(tables.accessCode.id, locals.session.codeId))
  //   redirect(301, "/account/" + res.code + "/dashboard")
  // }
  return {
    user: user,
    session: locals.session
  }
};

export const actions: Actions = {
  logout: logUserOut
};
function validate({requestedCode, locals}) {
	const valid =
		requestedCode.length == 4 &&
		locals.user && locals.session
	return valid
}
function requireLogin() {
  const { locals } = getRequestEvent();
  if (!locals.user) {
    return redirect(302, "/login");
  }
  return locals.user;
}
