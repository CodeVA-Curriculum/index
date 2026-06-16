import type { LayoutServerLoad } from './$types';
import { Map } from '$lib/components/guide/Map.svelte'
import { getGuideFromParam } from '$lib/server/db/utils'
// Construct the map and load it in
export const load: LayoutServerLoad = async ({ params }) => {
  const guide = await getGuideFromParam(params.guide)

	return {
	  guide: {
	    ...guide,
  	  pathTitle: params.guide
	  }
	};
};
