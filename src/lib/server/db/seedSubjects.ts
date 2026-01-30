import YAML from 'yaml'
import { read } from 'to-vfile'

export async function seedSubjects(db:any, schema:any) {
  const yaml = ((await read('static/standards/id_key.yaml')).value).toString()
  const idKey = await YAML.parse(yaml)
  // construct the subjects that aren't children of another subject
  // 
  await db.delete(schema.subject) // drop everything, we're replacing it from source
  const childSubjects = []
  const dbObjs = {}
  for(const [k,v] of Object.entries(idKey)) {
    const obj = idKey[k]
    if(!obj.subject && !obj.inherit) {
      const o = await db.insert(schema.subject).values({
        title: obj.title,
        abbr: k,
        strands: JSON.stringify(obj.strands)
      }).returning()
      dbObjs[o[0].abbr] = o[0]
    } else {
      let c = { ...obj }
      c.abbr = k
      childSubjects.push(c)
    }
  }
  // now do the same thing for all the remaining subjects, which should be stored as "courses"
  await db.delete(schema.course)
  console.log("Adding " + childSubjects.length + " courses...")
  for(const course of childSubjects) {
    console.log(`Adding ${course.title} with subject_id ${dbObjs[course.subject].id}`)
    let strands = ''
    if(course.inherit) {
      strands = JSON.stringify(dbObjs[course.inherit].strands)
    } else {
      strands = JSON.stringify(course.strands)
    }
    await db.insert(schema.course).values({
      title: course.title,
      abbr: course.abbr,
      subjectId: dbObjs[course.subject].id,
      strands: strands
    }).returning()
  }
  return {
    subjects: db.select().from(schema.subject),
    courses: db.select().from(schema.course)
  }
}
