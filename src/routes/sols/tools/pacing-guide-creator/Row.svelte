<script lang='ts'>
    import { faEdit } from "@fortawesome/free-regular-svg-icons";
    import type { Row } from "./_data";
    import Fa from 'svelte-fa'
    import Carousel from "./Carousel.svelte";
    import { faArrowDown, faArrowUp, faPlus, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
    import Form from "./Form.svelte";

    export let title:string
    export let description:string
    export let duration:number = 1
    export let sols:string[] = []
    export let suggestedSOLs:string[] = []
    export let lessons:string[] = []

    let edit = true
</script>

<tr>
    {#if edit}
    <td class='form-row' colspan=5>
        <Form />
    </td>
    {:else}
    <td>{duration}</td>
    <td>{title}<br><br>{description}</td>
    <td>
        {#each sols as sol}
        {sol}
        {/each}
    </td>
    <td>
        <i>Suggested:</i>
        {#each suggestedSOLs as sol}
        {sol}
        {/each}
    </td>
    <td><Carousel lessons={lessons} /></td>
    {/if}
    <td class='ui'>
        {#if !edit}
        <button class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Edit"><Fa icon={faEdit} /></button>
        <button class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Move Up"><Fa icon={faArrowUp} /></button>
        <button class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Move Down"><Fa icon={faArrowDown} /></button>
        <button class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Add Row Below"><Fa icon={faPlus} /></button>
        <button class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Delete"><Fa icon={faTrash} /></button>
        {/if}
    </td>
</tr>


<style lang='scss'>
    .ui > button {
        display: block;
        width: 3rem;
        margin: 3px 0;
    }
    .ui {
        border: none;
        visibility: hidden;
        background-color: white;
    }
    tr:hover > .ui {
        visibility: visible;
    }
    .form-row {
        // border: none;
        background-color: white;
    }
</style>