import { redirect,json } from '@sveltejs/kit'
import * as auth from '$lib/server/auth'
import * as tables from '$lib/server/db/schema'
import { db } from '$lib/server/db/index'
import { eq } from 'drizzle-orm'
import type { Actions } from './$types'
import { logInWithCode, validateCode, logInWithPortal, isLoggedIn } from '$lib/server'

const TESTING = true;

interface FormData { session_token:string }
interface ValidationResponse { valid:boolean }

export async function load({ event, locals, url }) {
  if(locals.user && url.searchParams.get('redirect')) {
    return redirect(302, url.searchParams.get('redirect'));
  } else if(isLoggedIn(locals)) {
    redirect(302, "/account")
  }
  return {
    user: locals.user,
    session: locals.session
  }
}

export const actions = {
  login: logInWithPortal,
  confirm: validateCode,
  submit: logInWithCode,
  cancel: async (event) => {
    redirect(302, "/")
  }
} satisfies Actions;
