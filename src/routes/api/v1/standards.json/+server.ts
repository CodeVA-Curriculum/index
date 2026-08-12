import { redirect,json } from '@sveltejs/kit'
import * as schema from '$lib/server/db/schema'
import { db } from '$lib/server/db/index'
import { eq } from 'drizzle-orm'
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ( { request, locals } ) => {
  // TODO: check permissions on locals.user
    // Handle errors, like file not found
  let map = {}
  const standards = await db.query.standard.findMany()
  for(const sol of standards) {
    const [grade] = await db.select().from(schema.grade).where(eq(schema.grade.id, sol.gradeId))
    const [subject] = await db.select().from(schema.subject).where(eq(schema.subject.id, sol.subjectId))
    if(!(grade.title in map)) { map[grade.title] = {} }
    if(!(subject.title in map[grade.title])) { map[grade.title][subject.title] = [] }
    map[grade.title][subject.title].push(sol)
    map[grade.title][subject.title].sort((a,b) => a.id - b.id)
  }
  return json({
    standards: standards,
    map: map
  })
};
