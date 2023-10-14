<script lang='ts'>
    export let data:any = { results: [], related: [] };
    import Search from '$lib/components/Search.svelte';
    import ElementCard from '$lib/components/ElementCard.svelte';
    import {page} from '$app/stores'
    import { onMount } from 'svelte';

    onMount(() => {
        // console.log(data.results)
    })
</script>

<div class='search content has-text-centered'>
    <div class='section'>
        {#if data.results.length == 0 && data.related.length == 0}
        <h1 class='low'>Search Our Library</h1>
        <div class='has-text-left my-5'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        {/if}
        <Search data={$page.url.searchParams} filter={true} />
        {#if false}
        <div class='message is-warning'>
            <div class='message-header'>
                <p>Invalid Search!</p>
                <!-- <button clas s="delete" aria-label="delete"></button> -->
                <!-- <button on:click={()=>showError = false} class='delete' aria-label='delete'></button> -->
            </div>
            <div class='message-body'>
                <p>No search terms or filters selected! Use the text box and menus above to search the library.</p>
            </div>
        </div>
        {/if} 
    </div>
    
    {#if !(data.results.length == 0 && data.related.length == 0)}
    <div class='section results has-text-left'>
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
    <div class='section related has-text-left'>
        <h2>Related Materials</h2>
        {#if data.related && data.related.length > 0}
            {#each data.related as result}
            <ElementCard data={result} />
            {/each}
        {:else}
            <p><i>No Results</i></p>
        {/if}
    </div>
    {/if}
</div>

<style>
    .bar {
        margin-top: 1rem;
    }
    .low {
        margin-top: 6rem;
    }
    .results, .related {
        color: grey;
    }
    
</style>