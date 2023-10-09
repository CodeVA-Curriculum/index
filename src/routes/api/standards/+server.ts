import {json} from '@sveltejs/kit'

const standards:object[] = [
    {
        title:'K.CS.1',
        text: 'The student will construct sets of step-by-step instructions (algorithms) either independently or collaboratively including sequencing that emphasize the beginning, middle, and end.',
        subs:[],
        grade: 'Kindergarten',
        strand: 'Algorithms & Programming',
        subject: 'Computer Science'
    },
    {
        title: 'K.CS.2',
        text: 'The student will construct programs to accomplish tasks as a means of creative expression using a block based programming language or unplugged activities, either independently or collaboratively, including sequencing, emphasizing the beginning, middle, and end.',
        subs:[],
        grade: 'Kindergarten',
        strand: 'Algorithms & Programming',
        subject: 'Computer Science'
    },
    {
        title: 'K.CS.3',
        text: 'The student will create a design document to illustrate thoughts, ideas, and stories in a sequential (step-by-step) manner (e.g., story map, storyboard, and sequential graphic organizer).',
        subs:[],
        grade: 'Kindergarten',
        strand: 'Algorithms & Programming',
        subject: 'Computer Science'
    },
    {
        title: 'K.CS.4',
        text: 'The student will categorize a group of items based on one attribute or the action of each item, with or without a computing device.',
        subs:[],
        grade: 'Kindergarten',
        strand: 'Algorithms & Programming',
        subject: 'Computer Science'
    }
]

export function GET({ params }) {
    let output = {}
    let stds = standards
    console.log('starting...')
    while(stds.length > 0) {
        const length = stds.length - 1
        if(!output[stds[length].grade]) {
            output[stds[length].grade] = {}
        } else if(!output[stds[length].grade][stds[length].subject]) {
            output[stds[length].grade][stds[length].subject] = {}
        } else if(!output[stds[length].grade][stds[length].subject][stds[length].strand]) {
            output[stds[length].grade][stds[length].subject][stds[length].strand] = []
        } else {
            output[stds[length].grade][stds[length].subject][stds[length].strand].push(stds[length])
            stds.pop()
        }
        // console.log(output)
    }
    console.log(output)
	return json(output)
}