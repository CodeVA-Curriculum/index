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

interface Params {
    grades:string[]
}

// TODO: accept params
export function GET({ url }) {

    // TODO: get standards from "flat" version and arrange by grade > subject > strand
    const stds = {
        'Kindergarten': {
            'Computer Science': {
                'Algorithms & Programming': [
                    {
                        id: 'K.CS.AP.1',
                        title:'K.1',
                        text: 'The student will construct sets of step-by-step instructions (algorithms) either independently or collaboratively including sequencing that emphasize the beginning, middle, and end.',
                        subs:[],
                        grade: 'Kindergarten',
                        strand: 'Algorithms & Programming',
                        subject: 'Computer Science'
                    },
                    {
                        id: 'K.CS.AP.2',
                        title: 'K.2',
                        text: 'The student will construct programs to accomplish tasks as a means of creative expression using a block based programming language or unplugged activities, either independently or collaboratively, including sequencing, emphasizing the beginning, middle, and end.',
                        subs:[],
                        grade: 'Kindergarten',
                        strand: 'Algorithms & Programming',
                        subject: 'Computer Science'
                    },
                    {
                        id: 'K.CS.AP.3',
                        title: 'K.3',
                        text: 'The student will create a design document to illustrate thoughts, ideas, and stories in a sequential (step-by-step) manner (e.g., story map, storyboard, and sequential graphic organizer).',
                        subs:[],
                        grade: 'Kindergarten',
                        strand: 'Algorithms & Programming',
                        subject: 'Computer Science'
                    },
                    {
                        id: 'K.CS.AP.4',
                        title: 'K.4',
                        text: 'The student will categorize a group of items based on one attribute or the action of each item, with or without a computing device.',
                        subs:[],
                        grade: 'Kindergarten',
                        strand: 'Algorithms & Programming',
                        subject: 'Computer Science'
                    }
                ]
            },
            'Mathematics': {
                'Probability & Statistics': [
                    {
                        id: 'K.MT.PS.1',
                        title: 'K.1',
                        text: 'Lorem ipsum',
                        subs:[],
                        grade: 'Kindergarten',
                        strand: 'Probability & Statistics',
                        subject: 'Mathematics'
                    },
                    {
                        id: 'K.MT.PS.2',
                        title: 'K.2',
                        text: 'Lorem ipsum',
                        subs:[],
                        grade: 'Kindergarten',
                        strand: 'Probability & Statistics',
                        subject: 'Mathematics'
                    },
                    {
                        id: 'K.MT.PS.3',
                        title: 'K.3',
                        text: 'Lorem ipsum',
                        subs:[],
                        grade: 'Kindergarten',
                        strand: 'Probability & Statistics',
                        subject: 'Mathematics'
                    }
                ]
            }
        },
        "Grade 1": {
            'Computer Science': {
                'Algorithms & Programming': [
                    {
                        id: '1.CS.AP.1',
                        title:'1.1',
                        text: 'Lorem ipsum',
                        subs:[],
                        grade: 'Grade 1',
                        strand: 'Algorithms & Programming',
                        subject: 'Computer Science'
                    },
                    {
                        id: '1.CS.AP.2',
                        title: '1.2',
                        text: 'Lorem ipsum',
                        subs:[],
                        grade: 'Grade 1',
                        strand: 'Algorithms & Programming',
                        subject: 'Computer Science'
                    },
                    {
                        id: '1.CS.AP.3',
                        title: '1.3',
                        text: 'Lorem ipsum',
                        subs:[],
                        grade: 'Grade 1',
                        strand: 'Algorithms & Programming',
                        subject: 'Computer Science'
                    },
                    {
                        id: '1.CS.AP.4',
                        title: '1.4',
                        text: 'Lorem ipsum',
                        subs:[],
                        grade: 'Grade 1',
                        strand: 'Algorithms & Programming',
                        subject: 'Computer Science'
                    }
                ]
            },
            'Mathematics': {
                'Probability & Statistics': [
                    {
                        id: '1.MT.PS.1',
                        title: '1.1',
                        text: 'Lorem ipsum',
                        subs:[],
                        grade: 'Grade 1',
                        strand: 'Probability & Statistics',
                        subject: 'Mathematics'
                    },
                    {
                        id: '1.MT.PS.2',
                        title: '1.2',
                        text: 'Lorem ipsum',
                        subs:[],
                        grade: 'Grade 1',
                        strand: 'Probability & Statistics',
                        subject: 'Mathematics'
                    },
                    {
                        id: '1.MT.PS.3',
                        title: '1.3',
                        text: 'Lorem ipsum',
                        subs:[],
                        grade: 'Grade 1',
                        strand: 'Probability & Statistics',
                        subject: 'Mathematics'
                    }
                ]
            }
        }
    }
	return json(stds)
}