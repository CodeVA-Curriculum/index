<script lang='ts'>
    export let data:any = { results: [] };
    import Search from '$lib/components/Search.svelte';
    import ElementCard from '$lib/components/ElementCard.svelte';
    import {page} from '$app/stores'
    import { onMount } from 'svelte';

    let params = true

    onMount(() => {
        // console.log(data.results)
    })
</script>

<div class='search content has-text-centered'>
    <div class='section'>
        {#if !params}
        <h1 class='low'>Search Our Library</h1>
        <div class='has-text-left my-5'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        {/if}
        <Search data={$page.url.searchParams} filter={true} />
    </div>
    
    <div class='section has-text-left'>
        <h2>Results</h2>
        {#if data.results && data.results.length > 0}
            {#each data.results as result}
            <ElementCard data={result} />
            {/each}
        {:else}
            <p><i>No Results</i></p>
        {/if}
    </div>
    <hr>
    <div class='section has-text-left'>
        <h2>Related Materials</h2>
        {#if data.related && data.related.length > 0}
            {#each data.related as result}
            <ElementCard data={result} />
            {/each}
        {:else}
            <p><i>No Results</i></p>
        {/if}
    </div>
</div>

<style>
    .bar {
        margin-top: 1rem;
    }
    .low {
        margin-top: 6rem;
    }
    p {
        color: grey;
    }
</style>