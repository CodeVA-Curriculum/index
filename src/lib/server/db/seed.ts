import { eq } from 'drizzle-orm'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import { unified } from 'unified'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify' 
import rehypeFormat from 'rehype-format' 
import remarkGfm from 'remark-gfm'
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { globby } from 'globby'
import Database from 'better-sqlite3';
import * as schema from './schema'
import { read } from 'to-vfile'
import YAML from 'yaml'
import { seedSubjects } from './seedSubjects'
import { seedStandards } from './seedStandards'
import type { AnyAaaaRecord } from 'dns'
// import { expandDashNotation } from '$lib/components/pacing-guide/util'

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
  const grades =  ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
  const gradeAbbr=['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  const audiences = ['Classroom Teachers', 'Lesson Planners', 'Learners & Students']

  await db.delete(schema.elementType)
  await db.delete(schema.elementToAudience)
  await db.delete(schema.audience)
  await db.delete(schema.elementToGrade)
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

  await db.delete(schema.element)
  // Pull all files
  const paths = await globby(['static/library', '!static/library/README.md'], {
    expandDirectories: { files: ['*.md', '.*.md'] }
  })
  const els:any[] = []
  const elsByPath:any = {}
  for(const path of paths){
    // console.log("Processing "+path)
    let el = await fileToElementObj(path)
    const dbObj:any = await db.insert(schema.element).values({
      title: el.title,
      short: el.short,
      path: el.path,
      content: el.content
    }).returning({ id: schema.element.id }) as any
    el.id = dbObj[0].id
    // console.log(literal, dbObj)
    // els.push({ literal: literal, relational: relational })
    elsByPath[path] = el
  }
  for(const path of paths) {
    const el =elsByPath[path]

    // inherit and update authors
    el.authors= inherit(el, 'authors', elsByPath)
    await db.update(schema.element).set({ authors: el.authors }).where(eq(schema.element.id, el.id))

    // inherit and update grades
    el.grades = expandDashNotation(inherit(el, 'grades', elsByPath))
    for(const grade of el.grades) {
      await db.insert(schema.elementToGrade).values({
        elementId: el.id,
        gradeId: gradeAbbr.indexOf(grade)
      })
    }

    // inherit and update audiences
    const audienceRows = await db.select().from(schema.audience).orderBy(schema.audience.id)
    let audienceByTitle:any = {}
    for(const a of audienceRows) {
      audienceByTitle[a.title] = a
    }
    el.audiences = inherit(el, 'audiences', elsByPath)
    console.log(typeof(el.audiences))
    // I truly have no idea why this is necessary. Sometimes we end up with the audiences as
    // an array instead of as a string to split and I have no idea why.
    if(typeof(el.audiences) == 'object') { el.audiences = el.audiences[0] }
    el.audiences = el.audiences.split(', ')
    for(const audience of el.audiences) {
      if(!audienceByTitle[audience]) {
        const o = await db.insert(schema.audience).values({title: audience}).returning()
        console.log("Inserted new audience " + audience)
        audienceByTitle[o[0].title] = o[0]
      }
      console.log("Associating " + audience + " with " + el.path)
      await db.insert(schema.elementToAudience).values({
        elementId: el.id,
        audienceId: audienceByTitle[audience].id
      })
    }
  }
}
main()

function reFrontmatter(values:any, field:string):string {
  if(field == 'audience' && typeof(values) == typeof([ 'string' ])) {
    let s = values[values.length-1]
    for(let i=values.length-2; i>=0; i--) { s = values[i] + ', ' }
  }
}

function inherit(obj:any, field:string, lib:any):string {
  if(!obj[field]) {
    console.log("Inheriting " + field + ' for ' + obj.path)
    const f = decedentField(obj.path, field, lib)
    console.log("found decedent " + f)
    return f
  } else {
    return obj[field]
  }
}
function decedentField(path:string, field:string, lib:any):string {
  // console.log("New stem path:", path)
  console.log("Finding candidates for " + field + " at " + path)
  if(!path.includes('meta.md')) {
    const p = path.substring(0, path.lastIndexOf('/'))
    const candidates = ['/.meta.md', '/meta.md']
    for(const candidate of candidates) {
      if(lib[p+ candidate] && lib[p+ candidate][field]) {      
        console.log("Found candidate at " + lib[p+candidate].path)
        return lib[p+candidate][field] as string
      }
    }
  } 
  
  if(!path.substring(0, path.lastIndexOf('/')).includes('static/library')) {
    throw new Error("climbed too high! " + path + ' | ' + path.substring(0, path.lastIndexOf('/')))
  }
  console.log("Did not find decedent, searching for metafiles in", path)
  return decedentField(path.substring(0, path.lastIndexOf('/')), field, lib)
}

async function fileToElementObj(path:string):Promise<any> {
  let frontmatter:any
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (tree:any) => {
      frontmatter = YAML.parse(tree.children[0].value)
    })
    .use(remarkGfm)
    // .use(remarkDirective)
    // .use(nsfDirective)
    // .use(supporterDirective)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(await read(path))

    // TODO: make sure the file has frontmatter;
    // console.log(frontmatter)
    
    return {
      ...frontmatter,
      content: file.toString(),
      path: path
      // literal: {
      //   content: file.toString(),
      //   author: tern(frontmatter, 'authors'),
      //   short: tern(frontmatter, 'short'),
      //   title: tern(frontmatter, 'title'),
      //   path: path
      // },
      // relational: {
      //   grades: frontmatter.grades? expandDashNotation(String(frontmatter.grades)): 'inherit',
      //   audiences: frontmatter.audiences? frontmatter.audiences.split(', ') : 'inherit',
      //   types: frontmatter.types? frontmatter.types.split(', ') : 'inherit'
      // }
    }
  
}
function expandDashNotation(fmGrade:string|number):string[] {
    fmGrade = String(fmGrade)
    // console.log("Expanding ", fmGrade)
    const gradeList = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'MS', 'HS']
    // split grades along commas
    const grades = fmGrade.replace(' ', '').split(',')
    // process dash notation
    for(let i=0;i<grades.length;i++) {
        if(grades[i].includes('-')) {
            const first:number = gradeList.indexOf(grades[i].substring(0, grades[i].indexOf('-')))
            const last:number  = gradeList.indexOf(grades[i].substring(grades[i].indexOf('-')+1, grades[i].length)) + 1
            for(let i=first;i<last;i++) {
                if(!grades.includes(gradeList[i])) {
                    grades.push(gradeList[i])
                }
            }
        }
    }
    // console.log(grades)
    return grades.filter(grade=>!grade.includes('-')) // remove dash item from array
}
