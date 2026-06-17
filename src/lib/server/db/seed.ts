import { eq, like } from 'drizzle-orm'
import { getDbStandardsFromAbbrList } from '$lib/server/db'
import { seedGuides } from './guides'
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { globby } from 'globby'
import Database from 'better-sqlite3';
import * as schema from './schema'
import { seedSubjects } from './seedSubjects'
import { fileToElementObj, seedActivities } from './parse'
import { seedStandards } from './seedStandards'
import { expandDashNotation } from '$lib/server/db/utils'

async function main() {
  const client = new Database(process.env.DATABASE_URL);

  const db = drizzle({ schema: schema, client: client });
  
  // clear database for seeding
  const tables = [ schema.activityToStandard, schema.elementToStandard, schema.standard, schema.elementToSubj, schema.subject, schema.child_element_ref, schema.elementToTag, schema.tag, schema.elementToType, schema.elementType, schema.elementToAudience, schema.audience, schema.elementToGrade, schema.grade, schema.element, schema.pivotNodeProject,  schema.nodeToNodeGroup, schema.nodeGroup, schema.project, schema.edge, schema.prompt, schema.question, schema.node, schema.guide]
  let count = 0
  for(const table of tables) {
    console.log(count++)
    await db.delete(table)
  }
  console.log("deleted tables")

  await seedGuides(db, schema)

  // seed subjects and courses
  const { subjects} = await seedSubjects(db, schema)


  // TODO: seed library elements
    // Add static elements: grades, types, audiences
  const types = ['Lesson Plan', 'Lesson Collection', 'Teacher Resource', 'Learner Resource', 'Curricular Resource', 'Unit of Study', 'Tutorials']
  const grades =  ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Middle School Course', 'High School Elective']
  const gradeAbbr=['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'MS', 'HS']
  const audiences = ['Classroom Teachers', 'Lesson Planners', 'Learners & Students']

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
  
  // seed standards
  const { standards } = await seedStandards(db, schema, subjects)

  // Pull all files
  const paths = await globby(['static/library', '!static/library/README.md'], {
    expandDirectories: { files: ['*.md', '.*.md'] }
  })
  const els:any[] = []
  const elsByPath:any = {}
  for(const path of paths){
    console.log("Processing "+path)
    let el = await fileToElementObj(path)
    const frontmatter = el.frontmatter
    let { id }  = (await db.insert(schema.element).values({
      title: el.title,
      short: el.short,
      long: el.long,
      content: el.content,
      link: el.links ? el.links.drive : null,
      gradesAbbr: el.grades,
      path: path.replace("static/library/", ''),
      // hidden: el.hidden
      standardsAbrr: el.standards,
      hidden: el.hidden? true : false
    }).returning({ id: schema.element.id }))[0] as any
    el.id = id
    el.frontmatter = frontmatter
    // el.id = dbObj[0].id
    // console.log(literal, dbObj)
    // els.push({ literal: literal, relational: relational })
    elsByPath[path] = el
    // console.log("Successfully added " + path + " to DB")
  }
  for(const path of paths) {
    const el =elsByPath[path]

    // inherit and update authors
    el.authors= inherit(el, 'authors', path, elsByPath)
    console.log("inherited authors values for " + path + ", updating database", el.authors)
    await db.update(schema.element).set({ authors: el.authors }).where(eq(schema.element.id, el.id))
    
    // inherit and update grades
    const inheritedGrades = inherit(el, 'grades', path, elsByPath)
    el.grades = expandDashNotation(inheritedGrades)
    for(const grade of el.grades) {
      await db.insert(schema.elementToGrade).values({
        elementId: el.id,
        gradeId: gradeAbbr.indexOf(grade)
      })
    }
    if(!el.gradesAbbr) {
      console.log("Updating gradesAbbr for", el.path)
      await db.update(schema.element)
      .set({ gradesAbbr: getDashNotation(inheritedGrades) })
      .where(eq(schema.element.id, el.id));
    }

    // inherit and update audiences
    const audienceRows = await db.select().from(schema.audience).orderBy(schema.audience.id)
    let audienceByTitle:any = {}
    for(const a of audienceRows) {
      audienceByTitle[a.title] = a
    }
    console.log("Inheriting audiences for " + path)
    el.audiences = inherit(el, 'audiences', path, elsByPath)
    // I truly have no idea why this is necessary. Sometimes we end up with the audiences as
    // an array instead of as a string to split and I have no idea why.
    if(typeof(el.audiences) == 'object') { el.audiences = el.audiences[0] }
    el.audiences = el.audiences.split(', ')
    for(const audience of el.audiences) {
      if(!audienceByTitle[audience]) {
        const o = await db.insert(schema.audience).values({title: audience}).returning()
        // console.log("Inserted new audience " + audience)
        audienceByTitle[o[0].title] = o[0]
      }
      // console.log("Associating " + audience + " with " + el.path)
      await db.insert(schema.elementToAudience).values({
        elementId: el.id,
        audienceId: audienceByTitle[audience].id
      })
    }

    // inherit and update types
    el.types = inherit(el,'types',  path, elsByPath)
    const typeRows = await db.select().from(schema.elementType).orderBy(schema.elementType.id)
    // console.log(el.types)
    el.types = typeof(el.types) == typeof([ 'string' ]) ? el.types : el.types.split(', ')
    for(const type of el.types) {
      // console.log("Associating " + type + " with " + el.path)
      const result = typeRows.filter((obj) => obj.title == type)
      // console.log(result)
      await db.insert(schema.elementToType).values({
        elementId: el.id,
        typeId: result[0].id
      })
    }

 
    // update tags (do not inherit)
    // this is different bc it's not associating only--it's:
    // first, split into valid [ "string" ] type, then:
    // N: inherit
    // el.types = inherit(el, 'types', )
    // Y: split
    el.tags = el.tags ? el.tags.split(', ') : []
    // Y: Add unique values to database
    const tagRows = await db.select().from(schema.tag)
    const uniqueTags = el.tags.filter((o) => {
      const res = tagRows.filter((r) => r.title == o.title )
      return res.length == 0 
    })
    const tagObjs = []
    for(const tag of uniqueTags) {
      tagObjs.push((await db.insert(schema.tag).values({
        title: tag
      }).returning({ id: schema.tag.id }))[0])
    }
    // Y: Associate all values with element
    for(const tag of tagObjs) {
      await db.insert(schema.elementToTag).values({
        elementId: el.id,
        tagId: tag.id
      })
    }
    
    // Subjects
    // Simple comma split
    el.subjects = inherit(el, 'subjects', path, elsByPath)
    if(typeof(el.subjects) == typeof('string')) {
      el.subjects = el.subjects.split(', ')
    }
    // console.log(el.subjects)
    // return
    
    // Create an association row for each subject in the list
    const dbSubjs = await db.select().from(schema.subject)
    for(const subj of el.subjects) {
      const res = dbSubjs.filter((o) => subj == o.title)
      if(res.length > 0) {
        await db.insert(schema.elementToSubj).values({
          elementId: el.id,
          subjectId: res[0].id
        })
      } 
    }

    // Do not inherit standards
    el.standards = el.standards? el.standards: []
    if(typeof(el.standards) == typeof('string')) {
      el.standards= el.standards.split(', ')
    }
    let dbStandards = await getDbStandardsFromAbbrList(el.standards)
//     for(const s of el.standards) {
//       const [ gradeToken, subjToken, strandToken, indexToken ] = s.split('.')
//       let gs = expandDashNotation(gradeToken)
//       for(const g of gs) {
//         let searchString = `${g}.${subjToken ? subjToken : '%'}.${strandToken? strandToken : '%'}.${indexToken? indexToken : '%'}`
//         const res = await db.select().from(schema.standard).where(like(schema.standard.abbr, searchString))
//         dbStandards = [...dbStandards, ...res]
//       }
//     }
// export async function getDbStandardsFromAbbrList(db, schema, abbrs:string[]) {
    for(const s of dbStandards) {
      await db.insert(schema.elementToStandard).values({
        elementId: el.id,
        standardId: s.id
      })
    }
    
    // connect children by reference
    let children = []
    let toPush = []
    if(el.contents && el.contents.length > 0) {
    for(let i=0;i<el.contents.length;i++) {
      const ref = el.contents[i].charAt(0) == '.' ? el.contents[i].replace('.', path.substring(0, path.lastIndexOf('/'))) : "static/library/" + el.contents[i]
      if(!ref.includes('.md')) {
        // child path is a directory
        children = paths.filter((p) => {
          return p == ref + "/meta.md"        })
        console.log(`Added ${children.length} children from group ${ref}`)
      } else if(paths.includes(ref)) {
        // child path is a file
        children = [ ref ]
        console.log(`Added ${ref}`)
      } else {
        throw new Error(`Can't find ${ref} in paths!`)
      }
      for(let i=0;i<children.length;i++) {
        const child_el = elsByPath[children[i]]
        if(!child_el) { throw new Error("Could not find element at child path " + child)}
        toPush.push({
          index: i,
          parent_id: el.id,
          child_id: child_el.id
        })
      }
    }
      console.log(toPush)
      await db.insert(schema.child_element_ref).values(toPush)
    }
  }

  // seed activities
  await seedActivities(db, schema)
}



main()


function reFrontmatter(values:any, field:string):string {
  if(field == 'audience' && typeof(values) == typeof([ 'string' ])) {
    let s = values[values.length-1]
    for(let i=values.length-2; i>=0; i--) { s = values[i] + ', ' }
  }
}

function inherit(obj:any, fieldName:string, path:string, lib:any):string {
  // Inherit the plain text value from valid decedents
  if(!obj[fieldName]) {
    console.log("Inheriting " + fieldName+ ' for ' + path)
    const f = decedentField(path, fieldName, lib)
    // console.log("found decedent " + f)
    return f
  } else {
    return obj[fieldName]
  }
}
function decedentField(path:string, field:string, lib:any):string {
  // console.log("New stem path:", path)
  // console.log("Finding candidates for " + field + " at " + path)
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

function getDashNotation(grades:string[]):string {
  if(typeof(grades) == typeof("string")) { grades = expandDashNotation(grades)}
  const gradeList = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'MS', 'HS']
  let out = grades[0]
  console.log(grades)
  if(grades.includes("MS")) {
    grades.splice(grades.indexOf("MS"), 1, "6", "7", "8")
    console.log("MS spliced")
  }
  if(grades.includes("HS")) {
    grades.splice(grades.indexOf("HS"), 1, "9", "10", '11', "12")
  }
  grades.sort((a,b) => gradeList.indexOf(a) - gradeList.indexOf(b))
  for(let i=1;i<grades.length; i++) {
    const consecutive = gradeList.indexOf(grades[i]) - gradeList.indexOf(grades[i-1]) == 1
    if(consecutive ) { out += out.charAt(out.length-1) == "-" ? "" : "-" } else { out += grades[i]}
  }
  if(out.charAt(out.length-1) == "-") { out += grades[grades.length-1]}
  return out
}
