import { getLessonGroups } from "$lib/utils"
import { getProjectsFrontmatter } from "$lib/utils/frontmatter";
// import {json} from '@sveltejs/kit'



export async function load(){
    let body = []
    // const post = await import(`../${params.slug}.md`)
    body = await getProjectsFrontmatter();
    // const content = await Promise.all(body)
    // console.log(body)
    return {
      projects: body
    }
  }

  export const prerender=true;