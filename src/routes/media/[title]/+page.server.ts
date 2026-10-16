import { redirect, error } from '@sveltejs/kit';

const titles = {
  "dsf-webinar-1": "https://youtu.be/2U6j1czjFho",
  "dsai-webinar-1": "https://youtu.be/bKogcPzgFN0"
}

export async function load({params}) {
  if(params.title in titles) {
    redirect(308, titles[params.title])
  }
  error(404, 'Page not found')
}
