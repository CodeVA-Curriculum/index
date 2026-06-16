import { error } from '@sveltejs/kit'
import { projectRelations } from '$lib/server/db'
import { db } from '$lib/server/db/index'
import * as schema from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'

export async function initiateTestSession() {
  // TODO: create a new session for a fake user
}

export async function getGuideFromParam(param:string){
  const searchPath = `${param}/meta.md`
  const result:Guide[] = await db.select().from(schema.guide).where(eq(schema.guide.path, searchPath))
  if(result.length != 1) {
    error(404, "No guide matches this url!")
  }
  return result[0]
}

export async function getProjectsFromGuide(guideId:number) {
  return await db.query.project.findMany({
    with: projectRelations,
    where: {
      guide: guideId
    }
  })
}
