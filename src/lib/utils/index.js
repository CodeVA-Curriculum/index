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

// const fetchPost = async (slug) => {
//     const allPostFiles = import.meta.glob('/content/*.md')
//     const iterablePostFiles = Object.entries(allPostFiles)
    
//     const allPosts = await Promise.all(
//       iterablePostFiles.map(async ([path, resolver]) => {
//         const { metadata } = await resolver()
//         const postPath = path // TODO: slice this boi
  
//         return {
//           meta: metadata,
//           path: postPath,
//         }
//       })
//     )
//     console.log("Hello")
//     return allPosts
// }

function getLessonGroups() {
  const posts = import.meta.glob('$content/**/meta.md'  )

  // console.log(posts)

  let body = []
  // @ts-ignore
  let paths = []
// console.log(posts)
  for (const path in posts) {
      paths.push(path);
      // @ts-ignore
      body.push(posts[path]().then((obj) => {
        return { 
            // @ts-ignore
            ...obj.metadata,
            path: path.slice("/src/content/".length, -7),
            // @ts-ignore
            content: obj.default
         }
    }))
  }
  // console.log(body)
  return body;
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

export {fetchMarkdownPosts, getLessonGroups, importDocument}