<script lang='ts'>
    import { faCaretDown, faCaretLeft, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function addAll() {
		dispatch('addAll');
	}

    export let title:string
    export let indent:number
    export let next:object

    let expanded = false

    // $: if(next) { console.log(Object.entries(next)) }
</script>

<div class='list-heading p-0' style='margin-left: {indent}rem;'>
    <!-- TODO: add A11y features -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class='wrapper columns line'>
        <!-- <div class='icon-left'><Fa rotate={90} icon={faArrowTurnUp} /></div> -->
        <div on:click={() => {expanded = !expanded}} class='heading-wrap column is-expanded mr-1 pl-1'>
            <span class='heading-name mr-3'>{title}</span>
            <slot name='pill' />
        </div>
        <div class='column is-narrow'>
            <button on:click={addAll} class='button has-icon left is-italic m-0'>
                <Fa class='pr-2' icon={faPlusCircle} />
                Add All
            </button>
            <span on:click={() => {expanded = !expanded}}>
                <Fa class='ml-3' icon={expanded? faCaretDown:faCaretLeft} />
            </span>
        </div>
    </div>
    {#if expanded}
    <slot />
    {/if}
    {#if expanded && next && Object.entries(next).length == 0}
    <div style='margin-left: {indent+1}rem;'>
        <p class='is-italic is-small'>Nothing here!</p>
    </div>
    {/if}
</div>

<style>
    .is-small {
        font-size: 9pt;
    }
    .heading-wrap:hover {
        background-color: whitesmoke;
    }
    .heading-wrap {
        border-radius: 4px;
    }
    .wrapper {
        margin: 0rem 0rem;
        padding: 0.25rem 0rem;
        color: black;
    }
    .wrapper div {
        margin: 0 0;
        padding: 0 0;
    }
    span {
        font-size: 10pt;
    }
    button {
        height: 1.5rem;
        margin-right: 0;
        font-size: 8pt;
        padding: 0 0.5rem;
    }
    button:hover {
        background-color: whitesmoke;
    }
</style>