import { getLessonGroups, importLibraryGlob } from "$lib/utils"
import { getAllFrontmatter, getProjectsFrontmatter } from "$lib/utils/frontmatter";
import {base} from '$app/paths'
// import {json} from '@sveltejs/kit'



export async function load({ fetch }){
    let body = []
    // const post = await import(`../${params.slug}.md`)
    // body = await getProjectsFrontmatter();
    const res = await getAllFrontmatter()
    const projects = res.filter((obj) => obj.pathData.path.includes('meta') && !obj.pathData.path.includes('.meta') && obj.pathData.path.split('/').length < 3)
    const lessons = res.filter((obj) => obj.types.includes("Lesson Plan"))
    
    return {
      projects: projects,
      lessons: lessons
    }
  }

  export const prerender=true;