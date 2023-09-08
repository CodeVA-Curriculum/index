import { getLessonGroups } from "$lib/utils"
// import {json} from '@sveltejs/kit'



export async function load(){
    // const post = await import(`../${params.slug}.md`)
    const body = await getLessonGroups();
    const content = await Promise.all(body)
    // console.log(content)
    return {
      content
    }
  }

  export const prerender=true;