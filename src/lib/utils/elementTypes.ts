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

interface Standard {
  name:string,
  subStds:string[],
  strand:string,
  grade:string|number
}

export type {Element, Standard}