import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '../src/lib/server/db/schema.ts';
import type { Element } from '../src/lib/server/db/schema.ts'
import { globby } from 'globby'
// import { env } from '$env/dynamic/private';

// if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const parseFiles = async (paths:string[]):Element[] => {
  const elements:Element[] = []
  for(const path of paths) {
    console.log("Parsing " + path + "...")
    const file = await parse(path)
    
  }
}

const client = new Database('../local.db');
export const db = drizzle(client, { schema });
const libPath = 'static/library'
const files = await globby([libPath+'/**/*.md', '!'+libPath+'/**/.*.md', '!'+libPath+'/**/README.md'])
