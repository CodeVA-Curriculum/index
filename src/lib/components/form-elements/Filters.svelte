<script lang='ts'>
    import {SvelteComponent, onMount} from 'svelte'
    import {slide} from 'svelte/transition'
    import { faCaretDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'
    import ListView from '../standards-list/ListView.svelte';
    import ChecklistDropdown, { type NestedDropdown } from '../standards-list/ChecklistDropdown.svelte';
    import CheckBoxDropdown from './CheckBoxDropdown.svelte';
    import InputWithDropdown from './InputWithDropdown.svelte';
    import {expandSubjectsStrands, renderGradesAsStrings, condenseDashNotation, gradeList, fullGradeNames, type GradesByBand, expandDashNotation, getGradeNums } from '$lib/utils/metaUtils';
    import type {ListedStandards, Standard} from '$lib/utils/metaUtils'
    import type {Params} from '$lib/utils/searchUtils'
    import {base} from '$app/paths'

    export let data:URLSearchParams; // to preset filter UI based on params

    let selectedStandards:Standard[] = []
    let stdsRequest:Promise<any>
    let standards:ListedStandards;

    // Standards List Stuff
    let showOrClose:boolean = false
    let loaded=false
    let listView:SvelteComponent

    let stdsList:string[] = []

    let subjects = {
        items:{} as NestedDropdown,
        start:[] as string[],
        selected:[] as string[]
    }
    let grades = {
        items:{} as GradesByBand,
        start:[] as string[],
        selected:[] as string[]
    }
    let types = {
        items:[] as string[],
        selected:[] as string[]
    }
    let audiences = {
        items:[] as string[],
        selected:[] as string[]
    }
    let tags = {
        items: [],
        selected:[] as string[]
    }
    
    

    export function getParams() {

        let sols:string[] = []
        for(let i=0;i<selectedStandards.length;i++) {
            sols = [...sols, selectedStandards[i].id]
        }
        // craft parameter URL
        const tmp:Params = {}
        if(audiences.selected.length > 0) { tmp['aud'] = audiences.selected }
        if(types.selected.length > 0) { tmp['type'] = types.selected }
        if(tags.selected.length > 0) { tmp['tag'] = tags.selected }
        // if(subjects.selected.length > 0) {tmp['subj'] = subjects.selected}
        if(sols.length > 0) { tmp['sol'] = sols }

        // Condense subjects
        let newSelected:string[] = [...subjects.selected]
        for(let i=0;i<subjects.selected.length;i++) {
            const subjInItems = subjects.items[subjects.selected[i]]
            if(subjInItems) {
                let foundStrands:string[] = [...newSelected.splice(newSelected.indexOf(subjects.selected[i]), 1)]
                // subject selected, check to see if all strands are included as well
                let hasStrands = true
                for(let j=0;j<subjInItems.length;j++) {
                    if(subjects.selected.includes(subjInItems[j])) {
                        // remove from newSelected, save in strands
                        foundStrands = [...newSelected.splice(newSelected.indexOf(subjInItems[j]), 1)]
                    } else {
                        hasStrands = false
                    }
                }
                hasStrands? newSelected.push('All '+subjects.selected[i]) : newSelected = [...foundStrands]
            }
        }
        
        subjects.selected = [...newSelected]
        if(subjects.selected.length > 0) {tmp['subj'] = subjects.selected}

        // Condense grade
        // Convert display names to numbers
        let shortNames:number[] = []
        for(let i=0;i<grades.selected.length;i++) {
            const index = fullGradeNames.indexOf(grades.selected[i])
            if(index >= 0) { // Filter out grade band (e.g., 'K-2')
                shortNames.push(index)
            }
        }
        // Convert contiguous sequences of grades to dash notation
        if(shortNames.length > 0) {tmp['grade'] = condenseDashNotation(shortNames)}
    
        return tmp
    }

    let filteredStandards = {}

    $: {
        if(loaded) {
            filteredStandards = filterStandards(grades.selected, subjects.selected, standards)
        }
    }
        

    function filterStandards(grades:string[], subjects:string[], standards:ListedStandards) {
        let filtered:ListedStandards = {}

        // Add indices for grade levels
        filtered = Object.fromEntries(Object.entries(standards).filter(([key]) => {
            return grades.includes(key)
        })) as ListedStandards;

        for(const grade in filtered) {
            // get subjects
            filtered[grade] = Object.fromEntries(Object.entries(standards[grade]).filter(([key]) => {
                // console.log(key, subjects)
                return subjects.includes(key)
            }));

            // // get strands
            for(const subj in filtered[grade]) {
                filtered[grade][subj] = Object.fromEntries(Object.entries(standards[grade][subj]).filter(([key]) => {
                    return subjects.includes(key)
                }));
            }
        }

        if(listView && loaded) {
            showOrClose = listView.updateListStatus(listView.getStatus())
        }
        // console.log(filtered)
        return filtered
    }

    onMount(async () => {
        // Pull dropdown items from API route
        const res = await (await fetch(`${base}/api/library/meta`)).json()
        subjects.items = res.subjects as NestedDropdown
        grades.items = res.grades as GradesByBand
        types.items = res.types
        audiences.items = res.audiences
        tags.items = res.tags

        // console.log(types.items)
        // subjects.start = ['Computer Science']
        let tmpGrades:string[] = []

        if(data) {
            if(data.has('aud'))   { audiences.selected = data.getAll('aud') }
            if(data.has('type'))  { types.selected = data.getAll('type') }
            if(data.has('subj'))  { subjects.start = data.getAll('subj') }
            if(data.has('tag'))   { tags.selected = data.getAll('tag') }
            if(data.has('sol'))   { 
                stdsList = data.getAll('sol')
            }
            
            if(data.has('grade')) { tmpGrades = data.getAll('grade') }
        }

        // expand dash notation 
        const expanded = getGradeNums(expandDashNotation(tmpGrades))
        expanded.sort((a,b) => a-b)
        // console.log(expanded)
        // get long names
        let longNames:string[] = []
        for(let i=0;i<expanded.length;i++) {
            longNames.push(fullGradeNames[expanded[i]])
        }
        grades.start = longNames

        // Expand subject names
        subjects.start = expandSubjectsStrands(subjects.start, subjects.items)

        let gl:number[] = []
        for(const [key, value] of Object.entries(grades.items)) {
            gl = [...gl, ...value]
        }

        // condense URL
        const gradesWithDashes:string[] = condenseDashNotation(gl)
        const url = new URLSearchParams()
        for(let i=0;i<gradesWithDashes.length;i++) {
            url.append('grades', gradesWithDashes[i])
        }

        stdsRequest = fetch(`${base}/api/standards/object.json`)
        stdsRequest.then(async (value) => {
            
            standards = await value.json()
            loaded=true
            // console.log(standards)
        })
        // console.log(subjects)
    })
</script>

<div class='filters has-text-left columns'>
    <div class='column is-narrow'>
        <label for='standards' class='label'>Standards</label>
        <div class='field'>
            <ChecklistDropdown 
                title='Subjects'
                id='subjects-dropdown'
                items={subjects.items} 
                bind:output={subjects.selected}
                start={subjects.start}
            />
            <ChecklistDropdown 
                width='10rem' 
                title='Grades' 
                id='grades-dropdown' 
                items={renderGradesAsStrings(grades.items)} 
                bind:output={grades.selected}
                start={grades.start}
            />
            <button on:click={() => {showOrClose = listView.updateListStatus()}} class='button is-small is-secondary {!loaded? 'is-loading':''}'>
                {showOrClose? 'Close List':'Select Standards'}
            </button>
        </div>
        {#await stdsRequest}
        <button class='button is-fullwidth is-loading hidden'></button>
        {:then}
        <div class='list-view-wrapper'>
            <ListView bind:this={listView} bind:selectedStandards={selectedStandards} standards={standards} filter={filteredStandards} start={stdsList}></ListView>
        </div>
        {/await}
    </div>
    <div class='column'>    
        <div class='field is-grouped'>
            <div class='control'>
                <label for='audience-dropdown' class='label small'>Audiences</label>
                <CheckBoxDropdown 
                    width={'10rem'}
                    title="Select..."
                    id='audience-dropdown'
                    items={audiences.items}
                    bind:selected={audiences.selected}
                />
            </div>
            <div class='control'>
                <label for='resource-dropdown' class='label small'>Resource Types</label>
                <CheckBoxDropdown 
                    width={'10rem'}
                    title="Select..."
                    id='resource-dropdown'
                    items={types.items}
                    bind:selected={types.selected}
                />
            </div>
            <div class='control'>
                <label for='tag-select' class='label small'>Tags</label>
                <InputWithDropdown 
                    id='tag-select'
                    bind:selected={tags.selected} 
                    tagsList={tags.items} 
                    placeholder="Type to search..." 
                />
            </div>
        </div>
    </div>
</div>

<style>
    .hidden {
        display: none;
    }
    button {
        width: 10rem;
        min-width: 10rem;
    }
    label {
        font-size: 8pt;
    }
</style>