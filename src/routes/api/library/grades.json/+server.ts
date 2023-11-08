import { json } from "@sveltejs/kit"
import { getGrades } from "../utils"
import { getAllFrontmatter } from "$lib/utils/frontmatter"
import type {Frontmatter} from '$lib/utils/frontmatter'

// Get all the grade levels a) for which we have standards, and b) for which we have resources in the library
export async function GET() {
    const frontmatters:Frontmatter[] = await getAllFrontmatter()
    const obj = await getGrades(frontmatters)
    return json(obj)
}

export const prerender = true