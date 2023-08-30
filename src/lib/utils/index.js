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
  const posts = import.meta.glob('$content/*/meta.md'  )

  let body = []
  let paths = []
// console.log(posts)
  for (const path in posts) {
      paths.push(path);
      // @ts-ignore
      body.push(posts[path]().then(({metadata}) => {
        return { 
            ...metadata,
            path: path.slice("/src/content/".length, -3)
         }
    }))
  }
  return body;
}

export {fetchMarkdownPosts, getLessonGroups}