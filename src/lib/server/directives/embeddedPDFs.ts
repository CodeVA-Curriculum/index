
import { visit } from "unist-util-visit"
import { h } from 'hastscript'

export function embeddedPDFs(tree, path) {
    // let index = 0;
    visit(tree, function (node:any) {
        if(node.tagName == 'pdf') {
            const pdfPath = node.children[0]?.value
            if(!pdfPath) {
                throw new Error("::pdf doesn't have src set!")
            }
            node.properties.url = path.substring(0, path.lastIndexOf('/')).replace('static/', '') + pdfPath.replace('./', '/')
            node.tagName = 'pdf-viewer'
        }
    })
}

