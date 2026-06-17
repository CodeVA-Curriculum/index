import YAML from 'yaml'
import { read } from 'to-vfile'
import { globby } from 'globby'
import { eq, inArray } from 'drizzle-orm'

export async function seedStandards(db:any, schema:any, subjects:any[]) {
  await db.delete(schema.standard)
  // get all the files in the standards repo
  const paths = await globby(['static/standards', '!static/standards/README.md', '!static/standards/id_key.yaml'])
  let standards = []
  for(const path of paths) {
    const file = (await read(path)).value.toString()
    const obj = await YAML.parse(file)
    standards = [...standards, ...obj]
  }
  for(const obj of standards) {
    // console.log(obj)
    let subs:string[] = obj.subs ? obj.subs as string[] : []
    let text = ''
    text = `<p>${obj.text}</p>`
    // find the subject
    let subj = obj.id.substring(obj.id.indexOf('.')+1)
    subj = subj.substring(0, subj.indexOf('.'))
    let gr = obj.id.substring(0, obj.id.indexOf('.'))
    console.log(obj.id)
    console.log(subj)
    const rSubj = await db.select().from(schema.subject).where(eq(schema.subject.abbr, subj == 'CS24' ? 'CS' : subj))
    if(rSubj.length == 0 ) { throw new Error("wat")}
    const g = await db.select().from(schema.grade).where(eq(schema.grade.abbr, gr))
    const workingList = rSubj.length > 0? rSubj[0] : null
    // console.log(subj, workingList[0])
    await db.insert(schema.standard).values({
      gradeId: g[0].id,
      abbr: obj.id,
      title: obj.title,
      text: text,
      subjectId: rSubj.length > 0? rSubj[0].id : null,
      subs: JSON.stringify(subs)
    })
  }
  // const yaml = ((await read('static/standards/id_key.yaml')).value).toString()
  return {
    standards: await db.select().from(schema.standard)
  }
}
