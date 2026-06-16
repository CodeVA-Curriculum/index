import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		console.log("No session token found")
		event.locals.user = null;
		event.locals.session = null;
		event.locals.accessCode = null;

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

	return resolve(event, {
		preload: ({ type }) => type === 'font' || type === 'js' || type === 'css'
	});
};

export const handle: Handle = handleAuth;
