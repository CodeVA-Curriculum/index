<script lang='ts'>
    import GroupOrb from './GroupOrb.svelte';
    import Table from '$lib/components/element-views/Table.svelte'
    import {base} from '$app/paths'
    import Dropdown from './form-elements/Dropdown.svelte';
    import Fa from 'svelte-fa'
    import {faFilter, faList} from '@fortawesome/free-solid-svg-icons'
    import {faCircle} from '@fortawesome/free-regular-svg-icons'

    export let elems:any = []
//    let elems:number[] = [0, 0, 0, 0, 0, 0] 

    let audiences:string[] = ['Instructors', 'Students', 'General', 'Administrators']
    let subjects:string[] = ['Computer Science', 'Data Science']
    let grades:string[] = ['K-2', '3-5', '6-8', 'High School']
    let list:boolean = false

    function toggle() { 
        list = !list
    }
</script>

<div class='projects'>
    <div class='field is-grouped'>
        <!-- <p class='label'><Fa icon={faFilter} /></p> -->
        <Dropdown label="Audience" options={audiences} defaultOption="All Audiences" />
        <Dropdown label="Subject" options={subjects} defaultOption="All Subjects" />
        <Dropdown label="Grade Level" options={grades} defaultOption="All Grade Levels" />
        <input class='input mr-2' placeholder="Group Name">
        <button on:click={toggle} data-tooltip='View as {list? 'Orbs':'List'}' class='has-tooltip-arrow button'><Fa icon={list? faCircle:faList} /></button>
    </div>
    {#if list}
        <Table groups={elems} />
    {:else}
        {#each elems as el}
        <GroupOrb data={el} />
    <!-- {console.log(el.path)} -->
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
    .is-red {
        color: red;
    }
</style>