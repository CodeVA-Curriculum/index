<script lang='ts'>
    import { onMount } from "svelte";
    import {base} from '$app/paths'
    import ListView from "../standards-list/ListView.svelte";
    import StandardList from "./StandardList.svelte";
    import { gradeList, type Standard } from "$lib/utils/metaUtils";
    import StandardModal from "../standards-list/StandardModal.svelte";
    import StandardDetail from "./StandardDetail.svelte";
    import { fade } from 'svelte/transition'
    import StandardTag from "../standards-list/StandardTag.svelte";
    import {faTrash} from '@fortawesome/free-solid-svg-icons'
    import Fa from 'svelte-fa'
    import { createEventDispatcher } from "svelte";
    import { page} from '$app/stores'
    import { fullGradeNames } from "$lib/utils/metaUtils";

    export let show=false
    let selected:Standard[] = []

    let standards = {}
    let selectedTab:string = ''
    let loaded = false

    const dispatch = createEventDispatcher()
    onMount(async () => {
        const url = $page.url.searchParams
        const res = await (await fetch(`${base}/api/standards/object.json`)).json()
        const startingSOLs = url.has('sol') ? url.getAll('sol') : []
        let selectedSOLData:Standard[] = []

        // Fetch standard objects
        for(let i=0; i<startingSOLs.length;i++) {
            const res = await fetch(`${base}/api/standards/${startingSOLs[i]}.json`)
            const obj = await res.json()
            selected = [...selected, ...obj]    
        }
        // console.log("Selected standards", selectedSOLData)
        for(const k in res) {
            if(k != 'courseToSubjectMap') {
                selectedTab = selectedTab == ''? k : selectedTab 
            }

        }
        loaded = true;
        standards = res
        delete standards["courseToSubjectMap"]
        console.log('Loaded', selectedTab)
        // console.log(standards["Middle School Courses"])
    })

    export function getStandards():string[] {
        let solIDs:string[] = []
        for(let i=0;i<selected.length;i++) {
            solIDs.push(selected[i].id)
        }
        // console.log("Sending sols", solIDs)
        return solIDs
    }

    function remove(standard:Standard) {
        selected = selected.filter((std) => std.id != standard.id)
    }
    function removeAll() {
        selected = []
    }
    function sendChange(selected:Standard[]) {
        // console.log('Sending change...')
        dispatch('change')
    }

    $: sendChange(selected)

    let selectedStandard:Standard
</script>

<div class='standards-bar has-text-left'>
    <div class='selected {selected.length > 0 || show? '':'is-hidden'}'>
        <label class='label small'>Selected Standards:</label>
        {#each selected as standard}
        <!-- <span class='tag is-dark'>{standard.id}</span> -->
        <StandardTag on:delete={()=>remove(standard)} del={true} standard={standard} status={true} />
        {/each}
        {#if selected.length > 0}
        <span on:click={removeAll} class='clear-tag tag is-light'>Clear All<Fa class='ml-2' icon={faTrash} /></span>
        {/if}
    </div>
    <div class='my-3 mx-1 {show? '':'is-hidden'}'>
        <!-- GRADE SELECT TABS -->
        <div class='tabs is-boxed'>
            <ul class='p-0 m-0'>
                {#each Object.entries(standards) as [k,v], i}
                <li class='{k==selectedTab? 'is-active':''}'>
                    <a on:click={() => {selectedTab=k}}>
                        {gradeList[fullGradeNames.indexOf(k)]}
                        <!-- <span class='number-pill'>{countList[i]}</span> -->
                    </a>
                </li>
                {/each}
            </ul>
        </div>

        <!-- VIEW STANDARDS -->
        {#if loaded}
        <div class='columns'>
            <div class='outline column is-6-tablet is-12-mobile m-0 p-0'>
                {#each Object.entries(standards[selectedTab]) as [k,v], i}
                <StandardList bind:inFilter={selected} bind:selected={selectedStandard} title={k} list={v} />
                {/each}
            </div>
            <div class='view column is-6 is-hidden-mobile'>
                {#if selectedStandard}
                <div>
                    <StandardDetail on:close={() => { selectedStandard = null }} standard={selectedStandard} />
                </div>
                {:else}
                <p style='margin-top: 2rem; font-size: 10pt;' class='has-text-centered'><i>--- No Standard Selected ---</i></p>
                {/if}
            </div>
        </div>
        {/if}
    </div>
</div>

<style lang='scss'>
    .clear-tag {
        border: 1px solid black;
        &:hover {
            cursor: pointer;
        }
    }
    .view {
        padding-left: 3rem;
    }
    .outline {
        font-size: 11pt;
    }
    .number-pill {
        width: 1rem;
        border-radius: 20px;
        background-color: whitesmoke;
        text-align: center;
        margin: 0 0.5rem;
        color: black;
    }
    .tabs {
        font-size: 10pt;
    }
    .selected {
        background-color: whitesmoke;
        padding: 0.5rem 0.5rem;
        border-radius: 4px;
    }
    label {
        font-size: 8pt;
        display: inline-block;
        margin-left: 0.5rem;
    }
</style>