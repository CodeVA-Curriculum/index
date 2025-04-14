<script lang='ts'>
    import GroupOrb from './GroupOrb.svelte';
    import Table from '$lib/components/element-views/Table.svelte'
    import {base} from '$app/paths'
    import Dropdown from './form-elements/Dropdown.svelte';
    import Fa from 'svelte-fa'
    import {faFilter, faList} from '@fortawesome/free-solid-svg-icons'
    import {faCircle} from '@fortawesome/free-regular-svg-icons'
    import { onMount } from 'svelte';
    import type { Frontmatter } from '$lib/utils/frontmatter';
    import { expandDashNotation } from '$lib/utils/metaUtils';

    export let elems:Frontmatter[] = [];
//    let elems:number[] = [0, 0, 0, 0, 0, 0] 

    let audiences:string[] = []
    let subjects:string[] = []
    let grades:string[] = []
    export let list:boolean = false
    // let term:string = ''

    let filter = {
        term: '',
        audiences: '',
        subjects: '',
        grades: ''
    }
    let filteredList = []

    function toggle() { 
        list = !list
    }

    onMount(async () => {
        filteredList = filterProjects(filter, elems)
        const res = await (await fetch(`${base}/api/library/meta.json`)).json()
        
        audiences = res.audiences
        for(const subj in res.subjects) {
            subjects = [...subjects, res.subjects[subj]]
        }
        for(const band in res.grades) {
            grades = [...grades, band]
        }
    })

    function isIntersecting(array1:string[], array2:string[]):boolean {
    let intersections = 0
        for(let i=0;i<array1.length;i++) {
            intersections += array2.includes(array1[i])? 1 : 0
        }
        return intersections > 0
    }

    $: filtered = filterProjects(filter, elems)

    function filterProjects(filter:object, elems:Frontmatter[]):Frontmatter[] {
        // console.log('filtering...')
        let filtered = elems.filter((el)=> {
            const subjectsMatch = filter.subjects == 'All Subjects'? true : el.subjects.includes(filter.subjects)
            const audiencesMatch = filter.audiences == 'All Audiences'? true : el.audiences.includes(filter.audiences)
            // expand dash notation for both elements to find intersections
            const expandedFilterGrades = expandDashNotation([filter.grades])
            const expandedElementGrades = expandDashNotation(el.grades)
            const gradeMatch = filter.grades == 'All Grade Levels'? true : isIntersecting(expandedFilterGrades, expandedElementGrades)
            
            // This was here when we thought we'd have a search box, removed for now
            // const termMatch = filter.term.length > 0? el.title?.toLowerCase().includes(filter.term.toLowerCase()) : true
            
            return subjectsMatch && audiencesMatch && gradeMatch // && termMatch
        })
        return filtered
    }
</script>

<div class='projects'>
    <div class='field m-0 p-0'>
        <!-- <p class='label'><Fa icon={faFilter} /></p> -->
        <Dropdown bind:selected={filter.audiences} options={audiences} defaultOption="All Audiences" />
        <Dropdown bind:selected={filter.subjects} options={subjects} defaultOption="All Subjects" />
        <Dropdown bind:selected={filter.grades} options={grades} defaultOption="All Grade Levels" />
        <div class='my-2 mx-2 p-0 is-flex is-inline-block-tablet'>
            <input bind:value={filter.term} class='input mr-2 is-inline-block' placeholder="Group Name">
            <button on:click={toggle} style='width: 2rem;' data-tooltip='View as {list? 'Orbs':'List'}' class='has-tooltip-arrow button'><Fa icon={list? faCircle:faList} /></button>
        </div>
    </div>
    {#if list}
        <Table groups={filtered} />
    {:else}
        {#each filtered as el}
        <GroupOrb meta={el} />
        {/each}
    {/if}
</div>

<style>
    .button {
        border-color: white;
        padding: 0 0.25rem;
        text-decoration: underline;
    }
    .button:hover {
        border-color: grey;
    }
    input {
        max-width: 80%;
        flex-grow: 1;

    }
</style>