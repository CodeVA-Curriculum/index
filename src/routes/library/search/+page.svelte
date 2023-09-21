<script lang='ts'>
    export let data:any = { results: [] };
    import Search from '$lib/components/Search.svelte';
    import {onMount} from 'svelte'
    import {base} from '$app/paths'
    import ElementCard from '$lib/components/ElementCard.svelte';
    import {page} from '$app/stores'

    const testURL = '?query=hello&subject=Computer+Science&subject=English'

    onMount(async ()=>{
        const res = (await fetch(`${base}/api/library${testURL}`)).json()
    })
</script>

<div class='search content has-text-centered'>
    <div class='section'>
        <h1>Search Our Library</h1>
        <div class='has-text-left my-5'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <Search />
        <hr>
    </div>
    
    <div class='section'>
        {#if data.results && data.results.length > 0}
            {#each data.results as result}
            <ElementCard data={result} />
            {/each}
        {:else}
            <p><i>No Results</i></p>
        {/if}
    </div>
</div>

<style>
    h1 {
        margin-top: 6rem;
    }
    p {
        color: grey;
    }
</style>