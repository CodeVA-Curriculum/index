<script lang='ts'>
    import type { Standard } from "$lib/utils/metaUtils";
    import { faCaretDown, faCaretRight, faChevronDown, faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'

    export let title:string
    export let standards:Standard[] = []
    export let selected:Standard

    let expanded = false

    function select(standard:Standard) {
        console.log("Selected", standard.id)
        selected = standard
    }
    function add(standard:Standard) {
        console.log("Got call to add", standard.id)
    }
    function addAll() {
        for(let i=0;i<standards.length;i++) {
            add(standards[i])
        }
    }
</script>


<tr>
    <td style='position: relative;' colspan='4'>
        <div class='is-flex'>
            <p style='flex-grow: 1; cursor: pointer' class='is-inline-block m-0 p-0' on:click={()=>{expanded = !expanded}}>
                <Fa class='mr-3' icon={expanded? faCaretDown : faCaretRight} />
                {title}
            </p>
            <button on:click={addAll} class='button add-all'><Fa icon={faPlus} class='mr-2' />Add All</button>
        </div>
    </td>
</tr>
<tr class='headings {expanded? '' : 'is-hidden'}'>
        <th style='width: 1rem;'><!-- Add --></th>
        <th style='width: 3rem;'>Title</th>
        <th style='width: 4rem;'>ID</th>
        <th>Text</th>
        <!-- <th style='width: 6rem;'></th> -->
</tr>
{#each standards as standard}
<tr on:click={() => { select(standard) }} class='stds {expanded? '' : 'is-hidden'}'>
    <td><button class='add-standard' on:click={() => add(standard)}><Fa icon={faPlus} /></button></td>
    <td>{standard.title}</td>
    <td><span class='tag is-dark is-small'>{standard.id}</span></td>
    <td class='text'>
        {standard.text}
        {#each standard.subs as sub}
            {sub}
        {/each}
    </td>
    <!-- <td class='ml-0 pl-0 is-italic'>Read More</td> -->
</tr>
{/each}

<style lang='scss'>
    .text {
        max-width: 8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 0;
        margin-right:0;
    }
    .add-all {
        padding: 0 1rem;
        margin: 0 0;
        font-size: 9pt;
        font-style: italic;
        height: 1.5rem;
        float: right;
        position: relative;
        right: 13px;
    }
    .add-standard {
        background-color: white;
        &:hover {
            cursor: pointer;
        }
    }
    .table-container {
        overflow-x: hidden;
        white-space: nowrap;
    }
    .stds:hover {
        background-color: whitesmoke;
        cursor: pointer;
    }
    th {
        font-style: bold;
        font-size: 9pt;
    }
    .headings {
        background-color: gray;
        th {
            color: white;
            padding-top: 2px;
            padding-bottom: 2px;
        }
    }
</style>