import type { PageLoad } from './$types';

export const load:PageLoad = ({ params, fetch }) => {
  // load & return library elements
  return {
    hey: "ho"
  }
}
