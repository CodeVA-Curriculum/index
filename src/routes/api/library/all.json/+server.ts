import { getAllFrontmatter, type Frontmatter } from "$lib/utils/frontmatter";
import { getResources } from "$api/library/utils";
import { json } from "@sveltejs/kit";

export async function GET() {
    const frontmatters = await getAllFrontmatter()
    return json(frontmatters)
}

export const prerender = true