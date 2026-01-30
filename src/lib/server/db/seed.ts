import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema'
import { read } from 'to-vfile'
import YAML from 'yaml'
import { seedSubjects } from './seedSubjects'

async function main() {
  const client = new Database(process.env.DATABASE_URL);

  const db = drizzle(client, { schema: { ...schema } });
  const users = await db.select().from(schema.user)
  const { subjects, courses } = await seedSubjects(db, schema)
}
main()
