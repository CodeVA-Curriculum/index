import { redirect,json } from '@sveltejs/kit'
import * as schema from '$lib/server/db/schema'
import { db } from '$lib/server/db/index'
import { eq } from 'drizzle-orm'
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ( { request, locals } ) => {
	console.log("Got request to update data")
	const req = await request.json()
	const user = locals.user
	switch(req.type) {
		case "question":
		case "prompt":
			const table = req.type == "question" ? schema.user_to_question: schema.userToPrompt
			let res = await db.insert(table).values({
				itemId: Number(req.itemId),
				userId: user.id,
				answer: req.answer,
				complete: Boolean(req.complete)
			}).returning()
			console.log("Added question/prompt", res)
			break
		case "project":
		case "node":
			const elTable = req.type == "node" ? schema.user_to_node : schema.pivotUserProject
			res = await db.insert(elTable).values({
				itemId: Number(req.itemId),
				userId: user.id,
				complete: Boolean(req.complete),
			}).returning()
			console.log("Added project/node", res)
			break
	}
	return json({
		"Status": "Success"
	})
};
