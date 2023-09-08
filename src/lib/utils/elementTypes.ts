interface Frontmatter {
    title:string|null,
    authors:string,
    path:string,
    subject:string,
    grade:string|number,
    parents:Frontmatter[],
    children:Frontmatter[]
}

interface Element {
    content:string,
    metadata:Frontmatter,
    path:string,
    type:string
  }

export type {Frontmatter, Element}