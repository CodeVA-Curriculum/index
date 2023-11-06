import { getAllFrontmatter } from "$lib/utils/frontmatter";
import type {Frontmatter} from '$lib/utils/frontmatter'
import {json} from '@sveltejs/kit'
import {  getAudiences, getGrades, getResources, getSubjects, getTags } from "../utils";

interface Params {
    grade:`band`|`list`,
    subject:`band`|`list`
}

export async function GET({ fetch }) {
    const frontmatters:Frontmatter[] = await getAllFrontmatter()
    const subjects = await getSubjects(frontmatters)
    const grades = await getGrades(frontmatters)
    const audiences = getAudiences(frontmatters)
    const types = getResources(frontmatters)
    const tags = getTags(frontmatters)
    return json({
        subjects: subjects,
        grades: grades,
        audiences: audiences,
        types: types,
        tags: tags
    })
}

export const prerender = true;