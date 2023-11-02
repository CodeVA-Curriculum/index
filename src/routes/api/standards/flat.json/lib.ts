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
        // let subjName
        // if(key[id[1]].inherit) {
        //     subjName = key[id[1].inherit].title
        // } else {
        //     subjName = key[id[1]].title
        // }

        const grade = id[0]
        const course = id[1]
        const strand = id[2]
        const number = id[3]


        complete.push({
            id: stds[i].id,
            title: stds[i].title,
            text: stds[i].text,
            grade: fullGradeNames[gradeList.indexOf(grade)],
            strand: key[course].inherit? key[key[course].inherit].strands[strand] : key[course].strands[strand],
            subject: key[course].inherit? key[key[course].inherit].title : key[course].title,
            course: key[course].title,
            subs: stds[i].subs
        })
    }
    console.log(complete)
    return complete
}