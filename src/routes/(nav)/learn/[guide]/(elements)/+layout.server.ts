import type { LayoutServerLoad } from './$types';
import { Map } from '$lib/components/guide/Map.svelte'
import { getGuideFromParam } from '$lib/server/db/utils'
// Construct the map and load it in
export const load: LayoutServerLoad = async ({ params }) => {
  console.log("Loading [guide](elements)+layout.server.ts")
  const guide = await getGuideFromParam(params.guide)

	return {
	  guide: {
	    ...guide,
  	  pathTitle: params.guide
	  }
	};
};
