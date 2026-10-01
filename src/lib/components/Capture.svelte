<script lang='ts'>
    import { createEventDispatcher } from "svelte";
    let { children } = $props()
    let el:HTMLElement;
    const dispatch = createEventDispatcher()
    function capture(flag:boolean) {
        dispatch('capture', flag)
    }
</script>

<div class='capture' bind:this={el} on:mouseenter={() => capture(false)} on:mouseleave={() => capture(true)}>
  {@render children() }
</div>

<style>
    .capture {
        /* height: 100%; */
        /* display: inline-block; */
        position: relative;
        margin: 0 0;
        padding: 0 0;
    }
</style>
