import { visit } from "unist-util-visit"
import { h } from 'hastscript'

export function supporterCallout(tree, path) {
    // let index = 0;
    visit(tree, function (node:any) {
        if(node.tagName == 'supporter') {
            let label = node.children[0]?.value
            let image = node.properties.image
            if(!label) {
                label = "a private donor"
            }
            if(!image) {
                image = '/images/supporter.png'
            }
            node.tagName = 'supporter-callout'
            node.properties.message= label
            node.properties.image = image
            node.children = []
        }
    })
}
