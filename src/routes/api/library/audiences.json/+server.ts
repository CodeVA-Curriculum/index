import { getAllFrontmatter } from "$lib/utils/frontmatter";
import { getAudiences } from "../utils";
import { json } from "@sveltejs/kit";

export async function GET() {
    const frontmatters = await getAllFrontmatter()
    return json(getAudiences(frontmatters))
}

export const prerender = true