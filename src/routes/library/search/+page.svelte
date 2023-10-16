<script lang='ts'>
    export let data:any = { frontmatter: [], meta: [] };
    import Search from '$lib/components/Search.svelte';
    import ElementCard from '$lib/components/ElementCard.svelte';
    import { expandDashNotation, expandSubjectsStrands } from '$lib/utils/metaUtils';
    import {page} from '$app/stores'
    import { onMount } from 'svelte';
    import { getFilter, filterFrontmatter } from './lib';
    import type { Frontmatter } from '$lib/utils/frontmatter';

    let results:Frontmatter[] = []
    let related:Frontmatter[] = []

    let urlData:URLSearchParams = new URLSearchParams()
    
    onMount(async () => {
        urlData = $page.url.searchParams
        // load results based on Search filters
        if($page.url.searchParams.size == 0) {
            results = [],
            related = []
            return
        }

        // Get params
        let filter = getFilter($page.url.searchParams, data.meta)

        const res = await filterFrontmatter(filter, data.frontmatter)

        results = res.results
        related = res.related
    })
</script>

<div class='search content has-text-centered'>
    <div class='section'>
        {#if results.length == 0 && related.length == 0}
        <h1 class='low'>Search Our Library</h1>
        <div class='has-text-left my-5'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        {/if}
        <Search data={urlData} filter={true} />
    </div>
    
    {#if !(urlData.size == 0)}
    <div class='section results has-text-left'>
        <h2>Results</h2>
        {#if results && results.length > 0}
            {#each results as result}
            <ElementCard data={result} />
            {/each}
        {:else}
            <p><i>No Results</i></p>
        {/if}
    </div>
    <hr>
    <div class='section related has-text-left'>
        <h2>Related Materials</h2>
        {#if related && related.length > 0}
            {#each related as result}
            <ElementCard data={result} />
            {/each}
        {:else}
            <p><i>No Results</i></p>
        {/if}
    </div>
    {/if}
</div>

<style>
    .low {
        margin-top: 6rem;
    }
    .results, .related {
        color: grey;
    }
    
</style>