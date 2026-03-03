import { json } from '@sveltejs/kit'
import * as auth from '$lib/server/auth'
import * as tables from '$lib/server/db/schema'
import { db } from '$lib/server/db/index'
import { eq } from 'drizzle-orm'
import type { Actions } from './$types'

interface FormData { session_token:string }
interface ValidationResponse { valid:boolean }

export async function load({ locals }) {
  console.log("Loading page...")
  return {
    user: locals.user,
    session: locals.session
  }
}

export const actions = {
  default: async (event) => {
    // console.log("Got form")
    const form = await event.request.formData();
    // console.log(form)
    const auth_token = form.get("session_token")
    // console.log("Temporary Token:", auth_token)
    const validation = await (await fetch('https://portal.codevirginia.org/auth/api/validate-session', {
      method: 'POST',
      body: JSON.stringify({ token: auth_token }),
      headers: {
        'content-type': 'application/json'
      }
    }))
    // console.log(validation)
    const res = await validation.json()
    console.log(res)
    if(res.valid) {
      console.log("Got user")
      // Log the user in to our side of things, which means adding a session to the database and making a cookie for it.
      const token = auth.generateSessionToken()
      let [user] = await db.select().from(tables.user).where(eq(tables.user.email, res.email))
      if(!user) {
        // user is not in our database yet, so add them
        user = await db.insert(tables.user).values({
          name: res.first_name + " " + res.last_name,
          username: res.email,
          email: res.email,
          password_hash: '0000'
        }).returning()
      }
      const session = await auth.createSession(token, user.id)
      auth.setSessionTokenCookie(event, token, session.expiresAt)
      event.locals.user = user
      event.locals.session = session
    }
  }
} satisfies Actions;
