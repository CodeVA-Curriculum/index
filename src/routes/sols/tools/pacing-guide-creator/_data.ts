import type { Standard } from "$lib/utils/metaUtils"
import type { Frontmatter } from "$lib/utils/frontmatter"

export type Row = {
    duration:number,
    title:string,
    description:string,
    sols:Standard[],
    csols:Standard[],
    suggestedSOLs:Standard[],
    lessons:Frontmatter[]
}

export const testData:Row[] = [
    {
        duration: 1,
        title: "The Water Cycle",
        description: "Students learn about the water cycle",
        sols: [],
        csols: [],
        suggestedSOLs: [],
        lessons: []
    }
]