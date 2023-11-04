<script lang='ts'>
    import { onMount } from "svelte";
    import {base} from '$app/paths'
    import ListView from "../standards-list/ListView.svelte";
    import StandardList from "./StandardList.svelte";
    import type { Standard } from "$lib/utils/metaUtils";
    import StandardModal from "../standards-list/StandardModal.svelte";
    import StandardDetail from "./StandardDetail.svelte";

    export let show=false
    let selected:string[] = []

    let standards = {}
    let selectedTab:string = ''
    let loaded = false
    onMount(async () => {
        const res = await (await fetch(`${base}/api/standards/object.json`)).json()
        for(const k in res) {
            if(k != 'courseToSubjectMap') { 
                standards[k] = res[k]
                selectedTab = selectedTab == ''? k : selectedTab 
            }
        }
        loaded = true;
        console.log('Loaded', selectedTab)
    })

    let selectedStandard:Standard
</script>

<div class='standards-bar has-text-left'>
    <div class='selected {selected.length > 0 || show? '':'is-hidden'}'>
        <label class='label small'>Selected Standards:</label>
        {#each selected as standard}
        <span class='tag is-dark'>standard</span>
        {/each}
    </div>
    <div class='my-3 mx-1 {show? '':'is-hidden'}'>
        <!-- GRADE SELECT TABS -->
        <div class='tabs is-boxed'>
            <ul class='p-0 m-0'>
                {#each Object.entries(standards) as [k,v]}
                <li class='{k==selectedTab? 'is-active':''}'>
                    <a on:click={() => {selectedTab=k}}>
                        {k}
                        <span class='number-pill'>0</span>
                    </a>
                </li>
                {/each}
            </ul>
        </div>

        <!-- VIEW STANDARDS -->
        {#if loaded}
        <div class='columns'>
            <div class='outline column is-6-tablet is-12-mobile m-0 p-0'>
                {#each Object.entries(standards[selectedTab]) as [k,v]}
                <StandardList bind:selected={selectedStandard} title={k} list={v} />
                {/each}
            </div>
            <div class='view column is-6 is-hidden-mobile'>
                {#if selectedStandard}
                <StandardDetail on:close={() => { selectedStandard = null }} standard={selectedStandard} />
                {:else}
                <p style='margin-top: 2rem; font-size: 10pt;' class='has-text-centered'><i>--- No Standard Selected ---</i></p>
                {/if}
            </div>
        </div>
        {/if}
    </div>
</div>

<style lang='scss'>
    .view {
        padding-left: 2rem;
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