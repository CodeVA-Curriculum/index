<script lang='ts'>
    import Carousel from "./Carousel.svelte";
    import TableRow from "./Row.svelte";
    import { testData } from "./_data";
    import type { Row } from "./_data";
    import Load from "./Load.svelte";
    import Fa from "svelte-fa";
    import { faPencilSquare, faPenToSquare, faPlus, faCheck, faSave, faUpload } from "@fortawesome/free-solid-svg-icons";

    let rows:Row[] = [createEmptyRow()]//[]
    
    let editTitle = false;
    let title="Pacing Guide Title"

    let filename = title
    $: filename = title.toLowerCase().replaceAll(' ', '-') + '.json'
    let active = false;
    let loadedRows = 0

    let jsonData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rows));
    $: jsonData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rows));

    function createEmptyRow():Row {
        return {
            title: '',
            description: '',
            duration: 1,
            sols: [],
            csols: [],
            suggestedSOLs: [],
            lessons: []
        }
    }

    function updateRow(data:Row, position:number) {
        rows[position] = data
    }

    function moveUp(position:number) {
        console.log("Moving row up...")
        const node = rows[position]
        const r = rows
        if(position != 0) {
            r[position] = r[position-1]
            r[position-1] = node
        }
        rows = r
    }
    function moveDown(position:number) {
        console.log("Moving row down...")
        const node = rows[position]
        const r = rows
        if(position < rows.length -1) {
            r[position] = r[position+1]
            r[position + 1] = node
        }
        rows = r
    }
    function addBelow(position:number) {
        console.log("Adding row below", position)
        if(position == rows.length -1) {
            rows = [...rows, createEmptyRow()]
        } else {
            const backHalf = rows.splice(position, position + 1)
            const topHalf = rows.splice(0, position+1)
            rows = [...topHalf, createEmptyRow(), ...backHalf]
        }
    }

    function loadData(e:any) {
        rows = e.detail
        loadedRows = e.detail.length -1
    }
</script>
<div class='banner is-flex'>
    {#if editTitle}
        <div class='field'>
            <div class='control'>
                <input bind:value={title} class='input pacing-title title p-0'>
            </div>
        </div>
    {:else}
    <h1 class='title pacing-title'>
        {title}
    </h1>
    {/if}
    <button on:click={() => editTitle = !editTitle} class='button ml-3'><Fa icon={editTitle ? faCheck : faPenToSquare} /></button>
    <div class='right-panel'>
        <button on:click={() => active=true} class='button is-primary'>Import <span class='ml-2'><Fa icon={faUpload} /></span></button>
        <a href={jsonData} download={filename} class='button is-info'>Save <span class='ml-2'><Fa icon={faSave} /></span></a>
    </div>
</div>
<table class='table is-bordered is-fullwidth is-narrow'>
    <thead>
        <tr>
          <th>Week #</th>
          <th>Unit Description</th>
          <th>Non-CS SOLs</th>
          <th>CS SOLs</th>
          <th>Example CS Lesson Plan(s)</th>
          <!-- <th></th> -->
        </tr>
    </thead>
    <tbody>
        {#each rows as row, i}
            <TableRow 
                position={i}
                entries={row}
                empty={!(loadedRows >= i+1)}
                on:add={(e) => addBelow(e.detail)}
                on:up={(e) => moveUp(e.detail)}
                on:down={(e) => moveDown(e.detail)}
                on:change={(e) => updateRow(e.detail, i)}
            />
        {/each}
    </tbody>
</table>
<div class="modal {active? 'is-active' : ''}">
    <div on:click={() => active = false} class="modal-background"></div>
    <Load on:load={loadData} on:close={() => active = false} />
</div>

<style lang='scss'>
.pacing-title {
        font-style: italic;
        color: grey
    }
    input.pacing-title {
        height: 3rem;
    }
    .right-panel {
        display: block;
        margin-left: auto;
        margin-right: 7rem;
        // background-color: pink;
        button {
            float: right;
            margin-left: 0.5rem;
        }
    }
</style>