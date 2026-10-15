import { redirect, error } from '@sveltejs/kit';

const titles = {
  "dsf-webinar-1": "https://youtube.com/",
  "dsai-webinar-1": "https://youtube.com/"
}

export async function load({params}) {
  if(params.title in titles) {
    redirect(308, titles[params.title])
  }
  error(404, 'Page not found')
}
