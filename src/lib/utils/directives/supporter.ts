import { visit } from "unist-util-visit"
import {h} from 'hastscript'

export function supporterDirective() {
    /**
     * @param {import('mdast').Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return function (tree:any) {
      visit(tree, function (node) {
        if (
          (node.type === 'containerDirective' ||
          node.type === 'leafDirective' ||
          node.type === 'textDirective') && node.name == 'supporter'
        ) {
          // console.log("found node", node)
          const data = node.data || (node.data = {})
          const hast = h('div.supporter-disclaimer', [
            h('div.img-wrap', [
              h('img', {
                src: `/images/${node.properties.src}`,
                alt: `${node.children[0].value} logo.`
              })
            ]),
            h('p.text', `This material was created with support from ${node.children[0].value}. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of ${node.children[0].value}.`)
          ])
  
          data.hName = hast.tagName
          data.hProperties = hast.properties
          data.hChildren = hast.children
  
          // console.log(node)
        }
      })
    }
  }