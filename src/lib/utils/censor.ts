import type { Frontmatter } from "./frontmatter";

const disallowed = [
    "identity",
    "indigenous"
]

export function censorTitles(els:Frontmatter[]):Frontmatter[] {
    return els.filter((el:Frontmatter) => {
        const words = new Set((el.title as string).toLowerCase().split(' '))
        const foundDisallowed:boolean = disallowed.some(item => words.has(item))
        return !foundDisallowed
    })
}