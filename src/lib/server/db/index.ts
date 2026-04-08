import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
// import { env } from '$env/static/private';
import { relations } from './relations'

// if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');


// TODO: make this a conditional based on build status
  const client = new Database("/app/data/local.db");

  export const db = drizzle({ schema: schema, client: client, relations: relations});
