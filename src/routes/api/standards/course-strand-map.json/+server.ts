import { json } from "@sveltejs/kit";
import YAML from 'yaml'
import {read} from 'to-vfile'

export async function GET() {
    const key = YAML.parse((await read('src/standards/id_key.yaml')).toString())
    let obj = {}
    for(const course in key) {
        let strandsList = []
        const strandsObj = key[course].inherit ? key[key[course].inherit].strands : key[course].strands
        for(const strand in strandsObj) {
            strandsList.push(strandsObj[strand])
        }
        const subjName = key[course].inherit? key[key[course].inherit].title : key[course].title
        obj[subjName] = strandsList
    }
    // console.log(obj)
    
    return json(obj)
}

export const prerender = true;