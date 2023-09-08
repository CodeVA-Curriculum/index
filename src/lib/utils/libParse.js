import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import YAML from 'yaml'

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

function checkFrontmatterRequirements(frontmatter) {
  if(!frontmatter.title) {
    throw new Error(`File at ${frontmatter.path} must define a title!`)
  }
  if(!frontmatter.authors) {
    return false
  }
}

  export {parseFrontmatter, findMemberFrontmatter}