import { visit } from "unist-util-visit"
import { h } from 'hastscript'

export function downloadLink(tree, path) {
    // let index = 0;
    visit(tree, function (node:any) {
        if(node.tagName == 'download') {
            const label = node.children[0]?.value
            if(!label && !node.properties?.title) {
                throw new Error("::download isn't correctly configured!")
            }
            node.tagName = 'download-link'
            node.properties.title = node.properties.title ? node.properties.title : String(node.children[0].value)
            node.properties.file = label
            node.children = []
        }
    })
}
