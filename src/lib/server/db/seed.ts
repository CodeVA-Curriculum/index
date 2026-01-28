import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema'

async function main() {
  const client = new Database(process.env.DATABASE_URL);

  const db = drizzle(client, { schema: { ...schema } });
  const users = await db.select().from(schema.user)
  console.log(users)
}
main()
