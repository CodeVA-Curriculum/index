import YAML from 'yaml'
import { read } from 'to-vfile'

// Types
interface KeyEntry {
    title:string,
    subject?:string,
    inherit?:string,
    strands?:object
}
interface IDKEY {
    [name: string]: KeyEntry
}

export async function getKey() {
    return YAML.parse((await read('src/routes/api/standards/index/id_key.yaml')).toString())
}

export async function getSubjectsInKey() {
    const key = await getKey() as IDKEY
    const subjects:string[] = []
    for(const [k,v] of Object.entries(key)) {
        if(isSubject(v)) {
            subjects.push(v.title)
        }
    }
    subjects.sort()
    return subjects;
}

function isSubject(keyEntry:KeyEntry):boolean {
    // courses either 
    // 1. define their own strands and act as a subject to other courses (e.g., Mathematics)
    // 2. inherit strands from a subject and take on that subject at its own (e.g., Computer Science Foundations), or
    // 3. define their own strands and subject (which must exist as another key in id_key) (e.g., Data Science, Virginia Studies)
    return Object.hasOwn(keyEntry, 'title') && Object.hasOwn(keyEntry, 'strands') && !Object.hasOwn(keyEntry, 'inherit') && !Object.hasOwn(keyEntry, 'subject')
}