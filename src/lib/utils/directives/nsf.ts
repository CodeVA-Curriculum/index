import { visit } from "unist-util-visit"
import {h} from 'hastscript'

export function nsfDirective() {
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
          node.type === 'textDirective') && node.name == 'nsf'
        ) {
          // console.log("found node", node)
          const data = node.data || (node.data = {})
          const hast = h('div.nsf-disclaimer', [
            h('div.img-wrap', [
              h('img', {
                src: "/images/nsf.png",
                alt: "The NSF logo."
              })
            ]),
            h('p.text', `This material is based upon work supported by the National Science Foundation under Grant No. ${node.children[0].value}. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation.`)
          ])
  
          data.hName = hast.tagName
          data.hProperties = hast.properties
          data.hChildren = hast.children
  
          // console.log(node)
        }
      })
    }
  }