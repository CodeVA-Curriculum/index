import * as auth from '$lib/server/auth'
import { getRequestEvent } from '$app/server'
import { eq, and } from 'drizzle-orm'
import * as tables from '$lib/server/db/schema'
import { db } from '$lib/server/db'
import { fail, redirect } from '@sveltejs/kit'
export const TESTING = true

export function isLoggedIn(data) {
  return data.user && data.session
}
export const logInWithCode = async (event) => {
  const form = await event.request.formData()
  const alias = form.get("alias")
  const codeId = form.get("codeId")
  const avatar = form.get("avatar")

  console.log(`Got call to log in with code ${alias} and alias ${avatar}`)

  // Check to see if there's a matching existing avatar
  let [avatarUser] = await db.select().from(tables.user).where(eq(tables.user.username, avatar))
  if(!avatarUser) {
    avatarUser = (await db.insert(tables.user).values({
      username: avatar,
      codeId: Number(codeId)
    }).returning())[0]
  }
  
  const token = auth.generateSessionToken();
  const session = await auth.createSession(token, avatarUser.id, codeId, alias)
  auth.setSessionTokenCookie(event, token, session.expiresAt)
  console.log("Created session")
  event.locals.session = session
  redirect(301, "/account")
}
export async function validateCode(event) {
    const form = await event.request.formData()
    const pin = form.get("session_token")
    console.log("Logging in with code", pin)
    let [accessCode] = await db.select().from(tables.accessCode).where(eq(tables.accessCode.alias, pin))
    if(accessCode) {
        console.log("Got matching access code")
        return { confirm: {
          codeId: accessCode.id,
          alias: accessCode.alias,
          checkText: accessCode.check
        } }
    } else {
        return redirect(302, "/account?m=" + "Did not find access code " + pin)
    }
}  
export const logInWithPortal = async (event) => {
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
  if(res.valid || TESTING) {
    console.log("Got user")
    // Log the user in to our side of things, which means adding a session to the database and making a cookie for it.
    const token = auth.generateSessionToken()
    let [result] = await db.select({
     user: tables.user,
     accessCode: tables.accessCode 
    }).from(tables.user)
    .innerJoin(tables.accessCode, and(eq(tables.user.codeId, tables.accessCode.id), eq(tables.user.id, tables.accessCode.owner)))
    .where(eq(tables.user.email, res.email ? res.email : "test@test.com"))
    console.log("Logging user in", result)
    if(!result) {
      throw new Error("Did not find valid user!")
      // const user = await db.insert(tables.user).values({
      //   username: res.email ? res.email : "test_user",
      //   email: res.email ? res.email : "test@test.com",
      //   password_hash: '0000'
      // }).returning()
      // const accessCode = await db.insert(tables.accessCode).values({
      //   alias: "NULL",
      //   owner: user.id,
      //   check: user.email
      // }).returning()
      // await db.update(tables.user).set({ codeId: accessCode.id }).where(eq(tables.user.id, user.id))
      // user gets also gets their account accessCode, which tracks their account permissions.
      // when the user logs in with their portal account, their session gets associated with this accessCode
      // the accessCode, not the session, governs the page permissions each user enjoys.
      // The accessCodes are decoupled from sessions and users because a) users can give out their own low-auth sessions
      // and b) accessCodes are persistent "sessions" but should not persist at the same rate as login cookies.
      result = { user: user, accessCode: accessCode }
    }
    const { user, accessCode } = result
    console.log("Creating session for user", user.id)
    const session = await auth.createSession(token, user.id, accessCode.id, accessCode.alias)
    auth.setSessionTokenCookie(event, token, session.expiresAt)
    event.locals.user = user
    event.locals.session = session
  }
}
export const logInUser = async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!validateUsername(username)) {
			return fail(400, { message: 'Invalid username (min 3, max 31 characters, alphanumeric only)' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password (min 6, max 255 characters)' });
		}

		const [result] = await db
			.select({
			  user: table.user,
			  accessCode: table.accessCode
			})
			.from(table.user)
			.innerJoin(table.accessCode, eq(table.accessCode.owner, table.user.id))
			.where(eq(table.user.username, username));
    const { user, accessCode } = result
		const existingUser = user.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Incorrect username or password' });
		}
		if (!accessCode) {
			return fail(400, { message: 'User needs a personal access code to log in!' });
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});
		if (!validPassword) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id, accessCode.id, accessCode.alias);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/account');
	}
export function isCodeUser(user, accessCode) {
  return user.id != accessCode.owner
}
export const registerNewUser = async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!validateUsername(username)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});

		try {
			await db.insert(table.user).values({ id: userId, username, passwordHash });
			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch {
			return fail(500, { message: 'An error has occurred' });
		}
		return redirect(302, '/demo/lucia');
	}
export const logUserOut = async (event) => {
	if (!event.locals.session) {
		return fail(401);
	}
	await auth.invalidateSession(event.locals.session.id);
	auth.deleteSessionTokenCookie(event);

	return redirect(302, '/');
}

export const deactivateAccessCode = async (event) => {
  const form = await event.request.formData()
  const id = form.get("id")
  try {
    await db.update(tables.accessCode).set({ active: false }).where(eq(tables.accessCode.id, id))
  } catch(err) {
    return fail(401)
  }
}
export const activateAccessCode = async (event) => {
  const form = event.request.formData()
  const id = form.get("id")
  try {
    await db.update(tables.accessCode).set({ active: true }).where(eq(tables.accessCode.id, id))
  } catch(err) {
    return fail(401)
  }
}
export const createAccessCode = async (event) => {
  console.log("Got form", event.locals)
  const form = await event.request.formData();
  let requestedCode = form.get("code")
  if(event.locals.user && validate({ requestedCode, locals: event.locals})) {
    console.log("Generating code", requestedCode)
    // try { 
      let id = await db.insert(tables.accessCode).values({
        code: requestedCode,
        userId: event.locals.user.id,
        created: new Date().toString()
      }).returning()
      console.log(`Created access code ${requestedCode} with id ${id.id}`)
      return { goodId : true }
    // }
  }
}
export const deleteAccessCode = async (event) => {
  const form = await event.request.formData()
  const id = form.get("id")
  console.log("Deleting", id)
  try {
    await db.delete(tables.accessCode).where(eq(tables.accessCode.id, id))
  } catch(err) {
    console.log(err)
    return fail(401)
  }
}
