import { db } from '$lib/server/db'
import * as schema from '$lib/server/db/schema'
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const activities = await db.select().from(schema.activities)
  return {
    activities: activities
  }
};
