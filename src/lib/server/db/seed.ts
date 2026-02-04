import { drizzle } from 'drizzle-orm/better-sqlite3';
import { globby } from 'globby'
import Database from 'better-sqlite3';
import * as schema from './schema'
import { read } from 'to-vfile'
import YAML from 'yaml'
import { seedSubjects } from './seedSubjects'
import { seedStandards } from './seedStandards'

async function main() {
  const client = new Database(process.env.DATABASE_URL);

  const db = drizzle({ schema: schema, client: client });
  const users = await db.select().from(schema.user)

  // seed subjects and courses
  // const { subjects, courses } = await seedSubjects(db, schema)

  // seed standards
  // const { standards } = await seedStandards(db, schema, subjects, courses)

  // TODO: seed library elements
    // Add static elements: grades, types, audiences
  const types = ['Lesson Plan', 'Lesson Collection', 'Teacher Resource', 'Learner Resource']
  const grades =  ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8']
  const gradeAbbr=['K', '1', '2', '3', '4', '5', '6', '7', '8']
  const audiences = ['Classroom Teachers', 'Lesson Planners', 'Learners & Students']

  await db.delete(schema.elementType)
  await db.delete(schema.audience)
  await db.delete(schema.grade)

  for(let i=0;i<grades.length;i++) { await db.insert(schema.grade).values({
    id: i,
    title: grades[i],
    abbr: gradeAbbr[i]
  })}
  for(const a of audiences) {
    await db.insert(schema.audience).values({ title: a })
  }
  for(const t of types) {
    await db.insert(schema.elementType).values({ title: t })
  }

  // Pull all files
  const paths = await globby(['static/library', '!static/library/README.md'], {
    expandDirectories: { files: ['*.md'] }
  })
  const els:any[] = []
  const elsByPath:any = {}
  // for(const path of paths){
  //   console.log("Processing "+path)
  //   const el = await fileToElementObj(path)
  //   els.push(el)
  //   elsByPath[path] = el
  // }
}
main()
