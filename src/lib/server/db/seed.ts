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

  await db.delete(schema.element)
  // Pull all files
  const paths = await globby(['static/library', '!static/library/README.md'], {
    expandDirectories: { files: ['*.md'] }
  })
  const els:any[] = []
  const elsByPath:any = {}
  for(const path of paths){
    console.log("Processing "+path)
    let { literal, relational } = await fileToElementObj(path)
    const dbObj:any = await db.insert(schema.element).values(literal).returning({ id: schema.element.id }) as any
    literal.id = dbObj[0].id
    // console.log(literal, dbObj)
    els.push({ literal: literal, relational: relational })
    elsByPath[path] = { literal: literal, relational: relational }

    // assemble relational fields: grades, audiences, types
    // Grade IDs are in order (K.id = 0, 1.id = 1, etc.)
    console.log(relational)
    if(relational.grades != 'inherit') {
      for(const grade of relational.grades) {
        console.log("Associating " + path + " with " + grade)
        console.log(literal.id, gradeAbbr.indexOf(grade))
        await db.insert(schema.elementToGrade).values({
          elementId: literal.id,
          gradeId: gradeAbbr.indexOf(grade)
        })
      }
    }
    // console.log(relational)
  }

}
main()

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
    function tern(obj:any, field:string):string {
      if(!obj[field]) { return inheritField(path, field) } else return obj[field]
    }
    function inheritField(path:string, field:string) {
      return 'inherit'
    }
    
    return {
      literal: {
        content: file.toString(),
        author: tern(frontmatter, 'authors'),
        short: tern(frontmatter, 'short'),
        title: tern(frontmatter, 'title'),
        path: path
      },
      relational: {
        grades: frontmatter.grades? expandDashNotation(String(frontmatter.grades)): 'inherit',
        audiences: frontmatter.audiences? frontmatter.audiences.split(', ') : 'inherit',
        types: frontmatter.types? frontmatter.types.split(', ') : 'inherit'
      }
    }
  
}
function expandDashNotation(fmGrade:string):string[] {
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
