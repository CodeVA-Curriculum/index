import { drizzle } from 'drizzle-orm/better-sqlite3';
import { expandDashNotation } from '$lib/server/db/utils'
import { redirect } from '@sveltejs/kit'
import Database from 'better-sqlite3';
import { like } from 'drizzle-orm'
import * as schema from './schema';
// import env from '$env/static/private';
import { relations } from './relations'

// if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
export const elementRelations = {
    subjects: true,
    types: true,
    audiences: true,
    standards: true,
    tags: true,
    grades: true,
    children: { with : { grades: true }},
    status: true
}

export const questionRelations = {
  status: {
    limit: 1,
    orderBy: { date: "asc" },
  }
}
export const getQuestionRelations = (userId:number) => {
  let t = { ...questionRelations }  
  t.status.where = { userId: userId }
  return t
}
export const promptRelations = {
  status: {
    orderBy: { date: "asc" }
  }
}
export const getPromptRelations = (userId:number) => {
  const t = { ...promptRelations }
  t.status.where = { userId: userId }
  return t
}
export const nodeRelations = {
  questions: true,
  prompts: {
    with: { status: true }
  },
  status: {
    limit: 1,
    orderBy: { date: "asc" }
  }
}
export const getNodeRelations = (userId:number) => {
  if(userId) {
  let t = { ...nodeRelations }  
  t.questions.with = getQuestionRelations(userId)
  t.prompts.with = getPromptRelations(userId)
  t.status.where = { userId: userId }
  return t
  } else { return nodeRelations }
}
export async function loadNodesForGuide(db, guideId:number, user) {
  const nodes = await db.query.node.findMany({
    with: {
      questions: {
        with: { status: {
          orderBy: { date: "desc"},
          limit: 1,
          where: { userId: user?.id }
        }}
      },
      prompts: {
        with: { status: {
          orderBy: { date: "desc"},
          limit: 1,
          where: { userId: user?.id }
        }}
      },
      status: {
        limit: 1,
        orderBy: { date: "desc" }
      }
    },
    where: {
      guide: guideId
    }
  })
  return nodes
}

export const projectRelations = {
 status: {
    orderBy: { date: "asc" },
    limit: 1,
    }, pivot: true, nodeGroups: { with: { nodes: { with: nodeRelations}}}   
}
export const getProjectRelations = (userId:number) => {
  let t = {...projectRelations }
  t.status.where = { userId: userId }
  return t
}
export async function getDbStandardsFromAbbrList(abbrs:string[]) {
    let dbStandards = []
    for(const s of abbrs) {
      const [ gradeToken, subjToken, strandToken, indexToken ] = s.split('.')
      let gs = expandDashNotation(gradeToken)
      for(const g of gs) {
        let searchString = `${g}.${subjToken ? subjToken : '%'}.${strandToken? strandToken : '%'}.${indexToken? indexToken : '%'}`
        const res = await db.select().from(schema.standard).where(like(schema.standard.abbr, searchString))
        dbStandards = [...dbStandards, ...res]
      }
    }
    return dbStandards
}

// TODO: make this a conditional based on build status
const client = new Database("local.db");
export const db = drizzle({ schema: schema, client: client, relations: relations});
// export const db = null
