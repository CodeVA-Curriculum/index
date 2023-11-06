import { getAllFrontmatter } from "$lib/utils/frontmatter";
import { getSubjects } from "../utils";
import { json } from "@sveltejs/kit";

// Get all the subjects a) for which we have standards and b) for which we have an element in the library
export async function GET() {
    const frontmatters = await getAllFrontmatter();
    const metaSubjects = await getSubjects(frontmatters)
    
    return json(metaSubjects)
}