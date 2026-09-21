import type { Handle } from '@sveltejs/kit';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db'
import * as schema from '$lib/server/db/schema'

const handleAuth: Handle = async ({ event, resolve }) => {
	console.log("hook")
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	let newAnalytics = {
		id: encodeHexLowerCase(sha256(new TextEncoder().encode(auth.generateSessionToken()))),
		navFrom: event.url.origin,
		navTo: event.url.href
	}

	if (!sessionToken) {
		console.log("No session token found")
		event.locals.user = null;
		event.locals.session = null;
		event.locals.accessCode = null;
		db.insert(schema.event).values([newAnalytics]).returning().then(([res]) => {
			console.log("Added new event", res)
		})

		return resolve(event, {
			preload: ({ type }) => type === 'font' || type === 'js' || type === 'css'
		});
	}

	const { session, user, accessCode } = await auth.validateSessionToken(sessionToken);

	if (session) {
		// console.log("Found valid session")
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		// console.log("Did not find valid session")
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	event.locals.accessCode = accessCode

	newAnalytics.user = user
	newAnalytics.session = session
	newAnalytics.accessCode = accessCode

	db.insert(schema.event).values([newAnalytics]).returning().then(([res]) => {
		console.log("Added new event", res)
	})

	return resolve(event, {
		preload: ({ type }) => type === 'font' || type === 'js' || type === 'css'
	});
};

export const handle: Handle = handleAuth;
