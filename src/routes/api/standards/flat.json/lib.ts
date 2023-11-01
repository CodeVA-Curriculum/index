import YAML from 'yaml'
import { read } from 'to-vfile'
import type { Standard } from '$lib/utils/metaUtils'
import { gradeList, fullGradeNames } from '$lib/utils/metaUtils'

interface YamlStandard {
    id:string,
    title:string,
    text:string,
    subs:string[],
    path:string
}
interface SubjectKey {
    title:string,
    strands:object
}

export async function getStandards() {
    let stds:YamlStandard[] = []
    const files = await import.meta.glob(['../**/*.yaml', '!../id_key.yaml'])
    const key = YAML.parse((await read('src/routes/api/standards/id_key.yaml')).toString())
    for (const path in files) {
        const data = YAML.parse((await read(`src/routes/api/standards${path.replace('..', '')}`)).toString()) 
        stds = [...stds, ...data]
    }

    let complete:Standard[] = []
    for(let i=0;i<stds.length;i++) {
        const id = stds[i].id.split('.')

        // This will eventually have to be more sophisticated to deal with standards in different formats
        if(id.length < 4) {
            throw new Error(`Incorrectly formatted standard ${stds[i].id}`)
        }

        // Check to see if the subject needs to inherit strands
        let subjName
        if(key[id[1]].inherit) {
            subjName = key[id[1].inherit].title
        } else {
            subjName = key[id[1]].title
        }
    

        // console.log(key)
        let cat:string
        if(key[id[0]] && key[id[0]].inherit && key[id[0]].grade) {
            cat = key[id[0]].title
            id[0] = key[id[0]].grade
        } else {
            cat = subjName
        }

        // let cat = hsCourseCodes.includes(id[0]) ? subjCategories[hsCourseCodes.indexOf(id[0])] : subjName
        // if(hsCourseCodes.includes(id[0])) { id[0] = 'HS' }

        // Account for high school course codes & subject mapping
        complete.push({
            id: stds[i].id,
            title: stds[i].title,
            text: stds[i].text,
            subs: stds[i].subs,
            grade: fullGradeNames[gradeList.indexOf(id[0])], // TODO: this needs to not be separated from the rules of the YAML
            subject: subjName,
            course: cat,
            strand: key[id[1]].strands[id[2]]
        })
    }
    // console.log(complete)
    return complete
}