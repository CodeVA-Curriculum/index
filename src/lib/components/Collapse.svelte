<script>
    import Fa from 'svelte-fa'
    import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

    let open = false
    let collapse
    export let showDrop = false

    function toggle() {
        open = !open
        if (collapse.style.maxHeight){
            collapse.style.maxHeight = null;
        } else {
            collapse.style.maxHeight = collapse.scrollHeight + "px";
        }
    }
</script>

<div class='collapse'>
    <div class='columns is-mobile p-0 m-0'>
        <div class='column p-0 m-0'><slot name='heading'></slot></div>
        <div class='column is-narrow p-0 pr-3 m-0'>
            <slot name="label" />
            {#if showDrop}<button on:click={toggle}><Fa icon={open? faCaretDown:faCaretLeft} /></button>{/if}
        </div>
    </div>
    {#if showDrop}
    <div bind:this={collapse} class='collapsible {open? 'active':''}'>
        <slot />
    </div>
    {/if}
</div>

<style>
    button {
        border-width: 0px;
        background-color: white;
    }
    .collapsible {
        /* display: none; */
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
    }
    .collapsible.active {
        /* display: block; */
    }
</style>