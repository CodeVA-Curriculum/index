import * as auth from '$lib/server/auth';
import { db, elementRelations } from '$lib/server/db/index'
import { requireLogin } from '$lib/server'
import { makeCode } from '$lib/server/db'
import { eq } from 'drizzle-orm'
import * as schema from '$lib/server/db/schema'
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import { logUserOut, logInWithCode, logInWithPortal } from '$lib/server'
import type { Actions, LayoutServerLoad} from './$types';

export const load: LayoutServerLoad= async ({locals}) => {
  const grades = await db.select().from(schema.grade)
  const audiences = await db.select().from(schema.audience)
  const subjects = await db.select().from(schema.subject)
  const tags = await db.select().from(schema.tag)
  const elementTypes = await db.select().from(schema.elementType)

  
  const filters = {
    grades: grades,
    audiences: audiences,
    subjects: subjects,
    tags: tags,
    elementTypes: elementTypes
  }
	const user = requireLogin()
	const userCodes = await db.query.accessCode.findMany({
	  where: {
	    owner: user.id
	  }
	})
  // const [accessCode] = await db.select().from(schema.accessCode).where(eq(schema.accessCode.id, user.codeId))
  const permissions = { guides: [], library: ["k-8-lessons/test.md"] }
  const elements = await db.query.element.findMany({
    with: elementRelations,
    where: {
      path: { in: permissions.library }
    }
  })
  let guides = await db.query.guide.findMany({
    with: { 
      locations: { with: {
        status: true      
      }},
      projects: { with: {
        status: true
      }}
    }
  })
  return {
    filters: filters,
    user: user,
    session: locals.session,
    codes: userCodes,
    elements: elements,
    guides: guides
  }
};

function validate({requestedCode, locals}) {
	const valid =
		requestedCode.length == 4 &&
		locals.user && locals.session
	return valid
}
