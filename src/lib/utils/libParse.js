import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import YAML from 'yaml'
import * as fs from 'fs'
import { importLibraryGlob } from '.'

function validatePath(path) {
  if(fs.existsSync(`src/content/${path}.md`)) {
    return path
  } else if(fs.existsSync(`src/content/${path}/meta.md`)) {
    return path+'/meta'
  } else {
    return false
  }
}

async function parseFile(path) {
  let frontmatter;
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (tree) => {
      frontmatter = YAML.parse(tree.children[0].value)
      console.log(frontmatter)
      frontmatter.path = path
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
      file: file,
      frontmatter: frontmatter,
      type: path.includes('meta') ? 'group' : 'document',
    };
}

// TODO: Currently finds immediate parent, but does not find all parents in heirarchy to include in breadcrumb and backlinks
async function findParentFrontmatter(path) {
  const possibleParents = await importLibraryGlob('meta')
  let actualParents = []
  for(const parent in possibleParents) {
    const parentFrontmatter = await parseFrontmatter(parent)
    for(let i=0;i<parentFrontmatter.contents.length;i++) {
      const parentPath = parentFrontmatter.path
      const docName = parentFrontmatter.contents[i].replace('./', parentPath.substring(0, parentPath.indexOf('/meta.md'))+'/')
      if(docName == '/src/content/'+path+'.md') {
        // console.log('Found parent at', parentPath)
        // get parent object info
        possibleParents[parentPath]().then((obj) => {
          actualParents.push({
            ...obj.metadata,
            path: parentPath.substring('/src/content/'.length, parentPath.length-'meta.md'.length),
            // content: obj.default // Do not include parent content
          })
        })
      }
    }
  }
  return actualParents;
}

async function parseFrontmatter(path) {
    let frontmatter = {
      path: ''
    };
    // console.log(path.substring(1))
    const file = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter, ['yaml'])
      .use(() => (tree) => {
        frontmatter = YAML.parse(tree.children[0].value)
        frontmatter.path = path
      })
      .use(remarkRehype)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(await read(path.substring(1)))
    
    // TODO: Crawl up filesystem to inherit attributes from parents
    // frontmatter = await inheritFrontmatter(frontmatter)
    // TODO: if contents, get child element frontmatter and apply inherited values
    // if(frontmatter.contents) {
    //   frontmatter.children = await findChildFrontmatter(frontmatter)
    // } else {
    //   frontmatter.children = []
    // }

    return frontmatter
}

async function inheritFrontmatter(frontmatter) {
  console.log(`Checking inheritance for ${frontmatter.path}`)
  if(checkFrontmatterRequirements(frontmatter)) {
    return frontmatter;
  } else {
    // get parent path
    const parent = getParent(frontmatter.path)
    if(parent.exists) {
      // ensure parentFrontmatter meets requirements
      let parentFrontmatter = await parseFrontmatter(parent.path)
      parentFrontmatter = await inheritFrontmatter(parentFrontmatter)
      return applyInheritance(frontmatter, parentFrontmatter)
    } else {
      throw 'Reached top of stack and did not find required metadata in frontmatter!'
    }
  }
}

function getParent(path) {
  // get parent frontmatter from ./meta.md, or if file is meta.md, ../meta.md
  console.log(path)
  return {
    path: '',
    exists: true
  }
}

async function findMemberFrontmatter(frontmatter) {
  let children = []
  // TODO: this isn't how we want to do it, I don't think
  const thisPath = frontmatter.path.replace('/meta', '/')
  for(let i=0;i<frontmatter.contents.length;i++) {
    //TODO: treat child directories and child files differently
    const childPath= frontmatter.contents[i].replace('./', '')
    const childFrontmatter = await parseFrontmatter('/src/content/'+thisPath+childPath)

    // check for contents in child
    if(childFrontmatter.contents && childFrontmatter.contents.length>0) {
      childFrontmatter.children = await findMemberFrontmatter(childFrontmatter)
    } else {
      childFrontmatter.children = []
    }
    children.push(childFrontmatter)
  }
  // console.log(children)
  return children
}

// apply inheritable values from parentFrontmatter if null in frontmatter
function applyInheritance(frontmatter, parentFrontmatter) {
  frontmatter.authors = parentFrontmatter.authors
  return frontmatter
}

  export {parseFrontmatter, findMemberFrontmatter, parseFile, validatePath}