import { defaultFrontmatter } from "./frontmatter"
import type { Frontmatter } from "./frontmatter"

// an object with this class is input to the `Search` component, changing the UI to match the URL & results displayed on the page.
export class FilterSet {
    query:string = ''
    subjects:string[] = []
    grades:(string|number)[] = []
    standards:string[] = []
    audiences:string[] = []
    type:string[] = []// resource type
    tags:string[] = []

    constructor(params:URLSearchParams) {
        // TODO: assign values to fields
    }
}

export async function searchLibrary(filter:FilterSet):Promise<Frontmatter[]> {
    // TODO: implement search algorithm

    // 1. Load up everything in the library

    // 2. Narrow by resource type

    // 3. Narrow by audience

    // 4. Narrow by grade level

    // 5. Narrow by subject area

    // 6. Narrow by standards

    // 7. Narrow by tags

    // 8. Sort by query

    const fm:Frontmatter = defaultFrontmatter()
    return [fm]
}