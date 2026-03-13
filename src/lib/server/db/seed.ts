import { eq, like } from 'drizzle-orm'
import { seedGuides } from './guides'
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { globby } from 'globby'
import Database from 'better-sqlite3';
import * as schema from './schema'
import { seedSubjects } from './seedSubjects'
import { fileToElementObj } from './parse'
import { seedStandards } from './seedStandards'

async function main() {
  const client = new Database(process.env.DATABASE_URL);

  const db = drizzle({ schema: schema, client: client });
  
  // clear database for seeding
  const tables = [ schema.elementToStandard, schema.standard, schema.elementToSubj, schema.subject, schema.elementToTag, schema.tag, schema.elementToType, schema.elementType, schema.elementToAudience, schema.audience, schema.elementToGrade, schema.grade, schema.element,   schema.nodeToNodeGroup, schema.nodeGroup, schema.project, schema.edge, schema.node, schema.guide]
  for(const table of tables) {
    await db.delete(table)
  }

  await seedGuides(db, schema)

  // seed subjects and courses
  // const { subjects, courses } = await seedSubjects(db, schema)

  // seed standards
  // const { standards } = await seedStandards(db, schema, subjects, courses)

  // TODO: seed library elements
    // Add static elements: grades, types, audiences
  // const types = ['Lesson Plan', 'Lesson Collection', 'Teacher Resource', 'Learner Resource', 'Curricular Resource', 'Unit of Study', 'Tutorials']
  // const grades =  ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
  // const gradeAbbr=['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  // const audiences = ['Classroom Teachers', 'Lesson Planners', 'Learners & Students']

  // for(let i=0;i<grades.length;i++) { await db.insert(schema.grade).values({
  //   id: i,
  //   title: grades[i],
  //   abbr: gradeAbbr[i]
  // })}
  // for(const a of audiences) {
  //   await db.insert(schema.audience).values({ title: a })
  // }
  // for(const t of types) {
  //   await db.insert(schema.elementType).values({ title: t })
  // }
  

  // // Pull all files
  // const paths = await globby(['static/library', '!static/library/README.md'], {
  //   expandDirectories: { files: ['*.md', '.*.md'] }
  // })
  // const els:any[] = []
  // const elsByPath:any = {}
  // for(const path of paths){
  //   console.log("Processing "+path)
  //   let el = await fileToElementObj(path)
  //   let { id }  = (await db.insert(schema.element).values({
  //     title: el.title,
  //     short: el.short,
  //     path: el.path,
  //     content: el.content,
  //     link: el.links ? el.links.drive : null,
  //     gradesAbbr: el.grades,
  //     path: path.replace("static/library/", ''),
  //     // hidden: el.hidden
  //     standardsAbrr: el.standards,
  //     hidden: el.hidden? true : false
  //   }).returning({ id: schema.element.id }))[0] as any
  //   el.id = id
  //   // el.id = dbObj[0].id
  //   // console.log(literal, dbObj)
  //   // els.push({ literal: literal, relational: relational })
  //   elsByPath[path] = el
  //   // console.log("Successfully added " + path + " to DB")
  // }
  // for(const path of paths) {
  //   const el =elsByPath[path]

  //   // inherit and update authors
  //   el.authors= inherit(el, 'authors', path, elsByPath)
  //   console.log("inherited authors values for " + path + ", updating database", el.authors)
  //   await db.update(schema.element).set({ authors: el.authors }).where(eq(schema.element.id, el.id))
  //   // inherit and update grades
  //   // TODO: double-association
  //   el.grades = expandDashNotation(inherit(el, 'grades', path, elsByPath))
  //   for(const grade of el.grades) {
  //     await db.insert(schema.elementToGrade).values({
  //       elementId: el.id,
  //       gradeId: gradeAbbr.indexOf(grade)
  //     })
  //   }

  //   // inherit and update audiences
  //   const audienceRows = await db.select().from(schema.audience).orderBy(schema.audience.id)
  //   let audienceByTitle:any = {}
  //   for(const a of audienceRows) {
  //     audienceByTitle[a.title] = a
  //   }
  //   console.log("Inheriting audiences for " + path)
  //   el.audiences = inherit(el, 'audiences', path, elsByPath)
  //   // I truly have no idea why this is necessary. Sometimes we end up with the audiences as
  //   // an array instead of as a string to split and I have no idea why.
  //   if(typeof(el.audiences) == 'object') { el.audiences = el.audiences[0] }
  //   el.audiences = el.audiences.split(', ')
  //   for(const audience of el.audiences) {
  //     if(!audienceByTitle[audience]) {
  //       const o = await db.insert(schema.audience).values({title: audience}).returning()
  //       // console.log("Inserted new audience " + audience)
  //       audienceByTitle[o[0].title] = o[0]
  //     }
  //     // console.log("Associating " + audience + " with " + el.path)
  //     await db.insert(schema.elementToAudience).values({
  //       elementId: el.id,
  //       audienceId: audienceByTitle[audience].id
  //     })
  //   }

  //   // inherit and update types
  //   el.types = inherit(el,'types',  path, elsByPath)
  //   const typeRows = await db.select().from(schema.elementType).orderBy(schema.elementType.id)
  //   // console.log(el.types)
  //   el.types = typeof(el.types) == typeof([ 'string' ]) ? el.types : el.types.split(', ')
  //   for(const type of el.types) {
  //     // console.log("Associating " + type + " with " + el.path)
  //     const result = typeRows.filter((obj) => obj.title == type)
  //     // console.log(result)
  //     await db.insert(schema.elementToType).values({
  //       elementId: el.id,
  //       typeId: result[0].id
  //     })
  //   }
    
  //   // update tags (do not inherit)
  //   // this is different bc it's not associating only--it's:
  //   // first, split into valid [ "string" ] type, then:
  //   // N: inherit
  //   // el.types = inherit(el, 'types', )
  //   // Y: split
  //   el.tags = el.tags ? el.tags.split(', ') : []
  //   // Y: Add unique values to database
  //   const tagRows = await db.select().from(schema.tag)
  //   const uniqueTags = el.tags.filter((o) => {
  //     const res = tagRows.filter((r) => r.title == o.title )
  //     return res.length == 0 
  //   })
  //   const tagObjs = []
  //   for(const tag of uniqueTags) {
  //     tagObjs.push((await db.insert(schema.tag).values({
  //       title: tag
  //     }).returning({ id: schema.tag.id }))[0])
  //   }
  //   // Y: Associate all values with element
  //   for(const tag of tagObjs) {
  //     await db.insert(schema.elementToTag).values({
  //       elementId: el.id,
  //       tagId: tag.id
  //     })
  //   }
    
  //   // Subjects
  //   // Simple comma split
  //   el.subjects = inherit(el, 'subjects', path, elsByPath)
  //   if(typeof(el.subjects) == typeof('string')) {
  //     el.subjects = el.subjects.split(', ')
  //   }
  //   // console.log(el.subjects)
  //   // return
    
  //   // Create an association row for each subject in the list
  //   const dbSubjs = await db.select().from(schema.subject)
  //   for(const subj of el.subjects) {
  //     const res = dbSubjs.filter((o) => subj == o.title)
  //     if(res.length > 0) {
  //       await db.insert(schema.elementToSubj).values({
  //         elementId: el.id,
  //         subjectId: res[0].id
  //       })
  //     } 
  //   }

  //   // Do not inherit standards
  //   el.standards = el.standards? el.standards: []
  //   if(typeof(el.standards) == typeof('string')) {
  //     el.standards= el.standards.split(', ')
  //   }
  //   let dbStandards = []
  //   for(const s of el.standards) {
  //     const [ gradeToken, subjToken, strandToken, indexToken ] = s.split('.')
  //     let gs = expandDashNotation(gradeToken)
  //     for(const g of gs) {
  //       let searchString = `${g}.${subjToken ? subjToken : '%'}.${strandToken? strandToken : '%'}.${indexToken? indexToken : '%'}`
  //       const res = await db.select().from(schema.standard).where(like(schema.standard.abbr, searchString))
  //       dbStandards = [...dbStandards, ...res]
  //     }
  //   }
  //   for(const s of dbStandards) {
  //     await db.insert(schema.elementToStandard).values({
  //       elementId: el.id,
  //       standardId: s.id
  //     })
  //   }
    
  // }
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
