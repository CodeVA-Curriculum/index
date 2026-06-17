import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { env } from '$env/dynamic/private';

// if (!env.SECRET_KEY) throw new Error('SECRET_KEY is not set');

// export const auth_secret = env.SECRET_KEY

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, userId:number, codeId:number, alias:string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: table.Session = {
		id: sessionId,
		userId: userId,
		codeId: codeId,
		alias: alias,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	let { id } = await db.insert(table.session).values(session).returning();
	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	// console.log("validating session token...")
	const [result] = await db
		.select({
			user: table.user,
			session: table.session,
			accessCode: table.accessCode
		})
		.from(table.session)
		.innerJoin(table.user, eq(table.session.userId, table.user.id))
		.innerJoin(table.accessCode, eq(table.session.codeId, table.accessCode.id))
		.where(eq(table.session.id, sessionId));


	if (!result) {
		// console.log("Failed to validate token")
		return { session: null, user: null, accessCode: null };
	}
	console.log(result)
	const { session, user, accessCode } = result

	// console.log("validating token with accessCode", accessCode.alias)
	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.session).where(eq(table.session.id, session.id));
		return { session: null, user: null, accessCode: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(table.session)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.session.id, session.id));
	}

	return { session, user, accessCode };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(table.session).where(eq(table.session.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	console.log("Deleting session cookie...")
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}


