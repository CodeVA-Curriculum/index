
import { visit } from "unist-util-visit"
import { h } from 'hastscript'

export function lessonPlan(tree, path, frontmatter) {
    let index = 0;
    let leadIndex, trailIndex, parentNode;
    if(!path.includes('library') || path.includes('meta') || frontmatter.links || frontmatter.link) { return }
    visit(tree, function (node:any, index, parent) {
        if(node.tagName == 'h2' && node.children[0].value.toLowerCase().includes('outline')) {
          leadIndex = index
          parentNode = parent
        }
        if(node.tagName == 'h2' && node.children[0].value.toLowerCase().includes('assessment')) {
          trailIndex = index
        }
    })
    if(!trailIndex || !leadIndex) { throw new Error(`Lesson at ${path} did not label its outline correctly.`)}
    visit(tree, function (node, index, parent) {
      const inRange = index > leadIndex && index < trailIndex
      if(node.tagName == 'table' && inRange) {
        node.properties.className = 'outline'
      }
      if(node.tagName == 'tbody' && parent.properties.className == 'outline') {
        for(const child of node.children.filter((o) => o.type == 'element')) {
          for(let i=child.children.length-1;i>-1;i--) {
            if(child.children[i].tagName == 'td' && child.children[i].children.length > 0 && child.children.length - i < 3) {
              // child.children[i].properties.className = 'note';
              child.children[i].children = [ h(`div.note`, child.children[i].children)]
              break
            }
          }
        }
      }
    })
 
}

export const getComponent = (title:string, tabTitles:string[]) => {
    let tabs = [];
    for(let i=0;i<tabTitles.length;i++) {
        tabs.push(h('li'))
    }
    const component = h('article.code-and-image.card',[
        h('header.card-header.code-example.pl-5.pt-2.pb-0', h('h4.title', title)),
        h('section.card-content', [
            h('div.columns.is-tablet', [
                h('div.code.column.m-0', tabs)
            ])
        ])
    ])
} 
