import remarkParse from 'remark-parse'
import { expandDashNotation } from '$lib/server/db/utils'
import { getDbStandardsFromAbbrList } from '$lib/server/db'
import { globby } from 'globby'
import rehypeHighlight from 'rehype-highlight'
import { codeAndImage } from '$lib/server/directives/codeAndImage'
import remarkFrontmatter from 'remark-frontmatter'
import { unified } from 'unified'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify' 
import rehypeFormat from 'rehype-format' 
import remarkGfm from 'remark-gfm'
import { read } from 'to-vfile'
import YAML from 'yaml'
import { practice, quick_take, prompt } from '$lib/utils'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'


export async function fileToElementObj(path:string):Promise<any> {
  let frontmatter:any
  let qt:string = ''
  let qs:object[] = []
  let ps:object[] = []
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (tree:any) => {
      frontmatter = tree.children.length > 0? YAML.parse(tree.children[0].value) : {}
    })
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkDirectiveRehype)
    // .use(nsfDirective)
    // .use(supporterDirective)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(() => (tree:any) => {
        qt = quick_take(tree)
    })
    .use(() => (tree:any) => {
        const q = practice(tree, path)
        qs.push(...q)
    })
    .use(() => (tree:any) => {
      const p = prompt(tree, path)
      ps.push(...p)
    })
    .use(codeAndImage)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(await read(path))

    // TODO: make sure the file has frontmatter;
    // console.log(frontmatter)
    if(frontmatter && frontmatter.grades) { frontmatter.grades = String(frontmatter.grades)}
    
    return {
      ...frontmatter,
      hidden: path.includes('.meta.md'),
      content: file.toString(),
      questions: qs,
      quickTake: qt,
      prompts: ps,
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


export async function parseGuideFiles(paths:string[]) {
  let files = []
  for(const path of paths) {
    const file = await fileToElementObj(path)
    file.path = file.path.replace('static/trail-guides/', '')
    files.push(file)
  }
  return files
}
export async function parseNodeFile(path) {
  let file = await fileToElementObj(path)
  file.path = file.path.replace('static/trail-guides/', '')
  return {
    ...file
  }
}
export async function parseProjectFile(path) {
  let file = await fileToElementObj(path)
  if(typeof(file.nodes) == typeof(["string"])) {
    file.nodes = {
      $default: file.nodes
    }
  }
  file.path = file.path.replace('static/trail-guides/', '')
  return {
    ...file
  }
}

export async function seedActivities(db, schema) {
  console.log("Seeding activities...")
  const paths = await globby(['static/activities', '!static/activities/README.md'])
  for(const path of paths) {
    const file = (await read(path)).value.toString()
    const objs = await YAML.parse(file)
    for(const obj of objs) {
      obj.standardsRaw = obj.standards
    }
    const newActivities = await db.insert(schema.activity).values(objs).returning()
    // create standard associations
    let pivots = []
    for(const obj of newActivities) {
      let solAbbrs = expandDashNotation(obj.standardsRaw.split(", "))
      let sols = await getDbStandardsFromAbbrList(solAbbrs)
      for(const sol of sols) {
        pivots.push({
          standardId: sol.id,
          activityId: obj.id
        })
      }
    }
    await db.insert(schema.activityToStandard).values(pivots)
  }
  console.log("Done")
}
