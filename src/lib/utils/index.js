import {base} from '$app/paths'

const fetchMarkdownPosts = async () => {
    const allPostFiles = import.meta.glob('/content/*.md')
    const iterablePostFiles = Object.entries(allPostFiles)
    
    const allPosts = await Promise.all(
      iterablePostFiles.map(async ([path, resolver]) => {
        // @ts-ignore
        const { metadata } = await resolver()
        const postPath = path // TODO: slice this boi
  
        return {
          meta: metadata,
          path: postPath,
        }
      })
    )
  
    return allPosts
  }


async function getLessonGroups() {
  const posts = await importLibraryGlob('meta')

  let body = []
  // @ts-ignore
  let paths = []
// console.log(posts)
  for (const path in posts) {
      paths.push(path);
      // @ts-ignore
      body.push(posts[path]().then((obj) => {
        // console.log(obj.metadata)
        return { 
            // @ts-ignore
            ...obj.metadata,
            path: `${base}/library/browse/${path.slice("/src/content/".length, -7)}`,
            // @ts-ignore
            content: obj.default
         }
    }))
  }
  // console.log(body)
  return body;
}

async function importLibraryGlob(category) {
  if(category=='all') {
    return await import.meta.glob(['$content/**/*.md', '!$content/**/.*.md'])
  } else if(category=='meta') {
    return await import.meta.glob(['$content/**/meta.md', '!$content/**/.meta.md'])
  } else if(category=='meta-hidden') {
    return await import.meta.glob(['$content/**/meta.md', '$content/**/.meta.md'])
  }
  
}

// @ts-ignore
async function importDocument(doc) {
    
  let body = [];
  for (const path in doc) {
    // @ts-ignore
    body.push(doc[path]().then((obj) => {
      return { 
          // @ts-ignore
          ...obj.metadata,
          path: path.slice("/src/content/".length, -3),
          // @ts-ignore
          content: obj.default
      }
    }))
  }
  // const { title, type, authors } = post.metadata
  // const content = post.default

  return body[0]
}



export {fetchMarkdownPosts, getLessonGroups, importDocument, importLibraryGlob}