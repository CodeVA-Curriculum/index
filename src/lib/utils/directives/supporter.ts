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
          const image = node.children.length > 0 && node.children[0].value == "the Virginia Department of Education" ? "vdoe.png" : "donate.png"
          const text = node.children.length > 0 && node.children[0].value == "the Virginia Department of Education" ? `CodeVA created this material in partnership with the Virginia Department of Education and was paid for with state appropriation dollars.` : `CodeVA created this material with support from a private donor. It has not been reviewed or endorsed by the VDOE or other authorities for alignment to the Virginia Standards of Learning.`
          
          const hast = h('div.supporter-disclaimer', [
            h('div.img-wrap', [
              h('img', {
                src: `/images/${image}`
              })
            ]),
            h('p.text', text)
          ])
  
          data.hName = hast.tagName
          data.hProperties = hast.properties
          data.hChildren = hast.children
  
          // console.log(node)
        }
      })
    }
  }