import * as fs from 'fs'
import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import YAML from 'yaml'
import { importLibraryGlob } from '.'
import type { Element, Frontmatter } from './elementTypes'

interface PathValidator {
    exists:boolean,
    path:string
}

function getFrontmatter():Frontmatter {
    let frontmatter:Frontmatter = {
        title: null,
        authors: 'CodeVA Curriculum',
        path: '',
        subject: 'Computer Science',
        grade: 0,
        parents: [],
        children: []
    }
    return frontmatter
}

export function validatePath(path:string):PathValidator {
    let exists:boolean=false
    let validPath:string = path
    if(fs.existsSync(`src/content/${path}.md`)) {
        validPath = path
        exists=true
      } else if(fs.existsSync(`src/content/${path}/meta.md`)) {
        validPath = path+'/meta'
        exists=true
      } else {
        exists = false
      }
    return {
        exists: exists,
        path: validPath
    }
}

export async function parseFile(path:PathValidator):Promise<Element> {
    let frontmatter:Frontmatter = getFrontmatter()
    const file = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter, ['yaml'])
      .use(() => (tree) => {
        frontmatter = YAML.parse(tree.children[0].value)
        frontmatter.path = path.path
      })
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(await read('src/content/'+path+'.md'))
  
      // Find parents of document or group
      frontmatter.parents = await findParentFrontmatter(path);
  
      // If element frontmatter has a `contents`field (i.e., is a group), find member elements
      if(frontmatter.contents) {
        frontmatter.members = await findMemberFrontmatter(frontmatter)
      } else {
        frontmatter.members = []
      }
  
      // TODO: If frontmatter indicates inheritance, inherit required fields from indicated file (default: './meta.md', if filename is 'meta.md' then '../meta.md')
      
  
  
      return {
        content: file.toString(),
        metadata: frontmatter,
        type: path.includes('meta') ? 'group' : 'document',
      };
  }