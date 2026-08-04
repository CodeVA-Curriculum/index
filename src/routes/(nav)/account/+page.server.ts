import * as auth from '$lib/server/auth';
import { makeCode } from '$lib/server/db'
import { eq } from 'drizzle-orm'
import { db } from '$lib/server/db'
import * as schema from '$lib/server/db/schema'
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import { logUserOut, logInWithCode, logInWithPortal } from '$lib/server'
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
	const user = requireLogin()
	const userCodes = await db.query.accessCode.findMany({
	  where: {
	    owner: user.id
	  }
	})
  return {
    user: user,
    session: locals.session,
    codes: userCodes
  }
};

export const actions: Actions = {
  portalLogin: async (event) => { 
    console.log("Triggered portal login") 
    return await logInWithPortal(event)
  },
  codeLogin: async (event ) => {},
  validateCode: async (event) => {},
  logout: async (event) => await logUserOut(event),
  code: async (event) => {
    console.log("Creating new code!")
    const form = await event.request.formData()
    const alias = form.get("alias")
    try {
      const existingCodes = await db.select().from(schema.accessCode).where(eq(schema.accessCode.owner, event.locals.user?.id))
      if(existingCodes.filter((o) => o.alias == alias).length > 0) { throw new Error()}
      const [code] = await db.insert(schema.accessCode).values({
        alias: alias,
        owner: event.locals.user.id,
        check: event.locals.user?.email
      }).returning()
      return { res: `Created new access code ${code.alias}`}
    } catch(err) {
      console.log(err)
      return { res: `Failed to create access code with alias ${alias}; try another alias (you may not have more than one code with the same alias)`}
    }
  },
  power: async (event) => {
    try {
      const form = await event.request.formData()
      const id = Number(form.get("id"))
      const status = await form.get("status")
      const [code] = await db.update(schema.accessCode).set({ active: status == 'true'}).where(eq(schema.accessCode.id , id)).returning()
      return { res: `Updated access code ${code.id} to ${code.active ? 'active' : 'inactive'} status`}
    } catch(err) {
      console.log(err)
      return { res: "Error! Failed to update access code."}
    }
    return {
      res: "Activate/deactivate access code"
    }
  },
  delete: async (event) => {
    console.log("Delete access code")
    const form = await event.request.formData()
    const id = Number(form.get('id'))
    try {
      // Pull all of the pivot tables between users and this code
      await db.delete(schema.userToAccessCode).where(eq(schema.userToAccessCode.codeId, id))
      await db.delete(schema.accessCode).where(eq(schema.accessCode.id, id))
      return { res: `Deleted access code ${id}`}
    } catch(err) {
      console.log(err)
      return { res: "Failed to delete access code" }
    }
  }
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
