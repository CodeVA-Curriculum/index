<script lang='ts'>
    import {onMount} from 'svelte'
    
    import ChecklistDropdown from "./ChecklistDropdown.svelte";
    import ListView from './ListView.svelte';
    import {renderGradesAsStrings, gradesByBandToList} from '$lib/utils/metaUtils'
    import type {ListedStandards} from '$lib/utils/metaUtils'

    let filteredStandards:object[] = []
    let standards:ListedStandards = {
        'Kindergarten': {
            'Computer Science': {
                'Algorithms & Programming': [
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
            }
        }
    }

    function filterStandards(grades, subjects, standards) {
        let filtered = {}

        // Add indices for grade levels
        let gradeList = gradesByBandToList(grades)
        filtered = Object.fromEntries(Object.entries(standards).filter(([key]) => {
            return gradeList.includes(key)
        }));

        for(const grade in filtered) {
            // get subjects
            filtered[grade] = Object.fromEntries(Object.entries(standards[grade]).filter(([key]) => {
                return subjects[key] && subjects[key].includes(key)? true : false
            }));

            // // get strands
            for(const subj in filtered[grade]) {
                filtered[grade][subj] = Object.fromEntries(Object.entries(standards[grade][subj]).filter(([key]) => {
                    return subjects[subj].includes(key)? true : false
                }));
            }
        }

        

        if(listView) {
            showOrClose = listView.updateListStatus()
        }
        return filtered
    }

    $: filteredStandards = filterStandards(selectedGrades, selectedSubjects, standards)

    let listView:any;

    let showOrClose:boolean = false

    let subjects:object|false = false
    let grades:object|false = false
    export let selectedSubjects:any
    export let selectedGrades:any

    export let standardsObjs:object[] = []
    export let preselect;

    onMount(async () => {
        const res = await (await fetch('/api/library/meta')).json()
        subjects = res.subjects
        grades = res.grades

        
        const dropdown = {}
        for(const s in subjects) {
            dropdown[s] = [s]
            for(const st in subjects[s]) {
                dropdown[s].push(subjects[s][st])
            }
        }
        if(preselect && preselect.get('subj')) {
            const subjs = preselect.get('subj').split(',')
            for(const s in dropdown) {
                dropdown[s] = dropdown[s].filter((el) => subjs.includes(el))
            }
            selectedSubjects = dropdown
        }
        
    })

    async function getStandards() {
        const standards = await (await fetch('/api/standards')).json()
    }

    function getExpanded():string {
        if(listView) {
            return listView.getStatus() == 'list'? 'Show' : 'Close'
        } else {
            return 'Show'
        }
    }

    
</script>

<div class='standards-list'>
    <label for='standards' class='label'>Standards</label>
        <div class='field'>
            <!-- {#if subjects} -->
            <ChecklistDropdown 
                title='Subjects'
                id='subjects-dropdown'
                items={subjects} 
                bind:selected={selectedSubjects}
            />
            <!-- {/if} -->
            <!-- {#if grades} -->
            <ChecklistDropdown 
                width='10rem' 
                title='Grades' 
                id='grades-dropdown' 
                items={renderGradesAsStrings(grades)} 
                bind:selected={selectedGrades}
            />
            <!-- {/if} -->
            <!-- <div class='control'>
                <input class='input is-small' placeholder="Filter list...">
            </div> -->
            <!-- <div class='control'> -->
                <button on:click={() => {showOrClose = listView.updateListStatus()}} class='button is-small is-secondary'>
                    {showOrClose? 'Close List':'Show Standards'}
                </button>
        </div>
        <div class='list-view-wrapper'>
            <ListView bind:this={listView} bind:selectedStandards={standardsObjs} contents={filteredStandards}></ListView>
        </div>
</div>

<style>
    label {
        font-size: 8pt;
    }
    button {
        width: 10rem;
    }
    .list-view-wrapper {
        /* border-left: 1px;
        border-left-style: solid;
        border-left-color: black; */
        width: 100%;
        overflow-x: visible;
    }
</style>
