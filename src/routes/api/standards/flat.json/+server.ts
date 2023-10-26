import { json } from "@sveltejs/kit"
import { getStandards } from "./lib"


export async function GET() {
    const standards = await getStandards()
    // console.log("Got Standards:",standards)
    return json(standards)
}

export const prerender = true