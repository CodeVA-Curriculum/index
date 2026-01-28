import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '../src/lib/server/db/schema';
import { user } from '../src/lib/server/db/schema.js'

async function main() {
  const client = new Database('../local.db');
  const db = drizzle( client, { schema  } )

  const users = await db.select().from(user).all()
  console.log(users)
}
main()

