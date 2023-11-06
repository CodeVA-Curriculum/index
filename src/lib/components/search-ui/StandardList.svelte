<script lang='ts'>
    import StrandTable from "./StrandTable.svelte";
    import type { Standard } from "$lib/utils/metaUtils";
    import { faCaretDown, faCaretRight, faPlus } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'

    export let title:string
    export let list:any = {} // StrandList
    // { 
    //     strandTitle: [ Standards ]
    // }
    export let selected:Standard
    export let inFilter:Standard[] = []
    let expanded = false

    function addAll() {
        for(const [k,v] of Object.entries(list)) {
            // inFilter = inFilter.filter((std) => v.id != std.id)
            for(let i=0;i<v.length;i++) {
                inFilter = [...inFilter, v[i]]
            }
        }
    }

</script>

<div class='subject-row {expanded? '' : 'has-border'}'>
    <div class='is-flex'>
        <p style='flex-grow: 1' class='is-inline-block pb-1' on:click={() => { expanded = !expanded}}>
            <Fa icon={expanded? faCaretDown: faCaretRight} class='mr-3'/>
            {title}
        </p>
        <button on:click={addAll} class='button add-all mt-2 mb-2'><Fa icon={faPlus} class='mr-2' />Add All</button>
    </div>
    <div class='{expanded? '':'is-hidden'}'>
        <table class='table ml-5 mb-3'>
            {#each Object.entries(list) as [k,v]}
                <StrandTable bind:inFilter={inFilter} bind:selected={selected} title={k} standards={v} />
            {/each}
        </table>
    </div>
</div>

<style lang='scss'>
    .add-all {
        padding: 0 1rem;
        margin: 0 0;
        font-size: 9pt;
        font-style: italic;
        height: 1.5rem;
        float: right;
    }
    .has-border {
        border-bottom: 1px solid lightgray;
    }
    .subject-row {
        padding-top: 0.5rem;
        margin-left: 0.5rem;
        p {
            margin: 0 0;
            padding: 0 0;
            padding-top: 0.5rem;
            padding-left: 0.5rem;
        }
    }
    .is-flex:hover {
        background-color: whitesmoke;
        cursor: pointer;
    }
</style>