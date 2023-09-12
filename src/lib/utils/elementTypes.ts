// interface Frontmatter {
//     title:string|null,
//     authors:string,
//     path:`${string}.md`,
//     subject:string,
//     grade:string|number,
//     parents:Frontmatter[],
//     children:Frontmatter[]
// }
import type {Frontmatter} from '$lib/utils/frontmatter'

interface Element {
    content:string,
    frontmatter:Frontmatter,
    type:string
  }

export type {Element}