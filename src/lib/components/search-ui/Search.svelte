<script lang='ts'>
    import {page} from '$app/stores'
    import {goto} from '$app/navigation'
    import {base} from '$app/paths'
    import {SvelteComponent, onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faCaretDown, faCaretLeft, faFilter, faSearch} from '@fortawesome/free-solid-svg-icons'
    import {slide} from 'svelte/transition'

    // components
    import Filters from '$lib/components/search-ui/Filters.svelte'
    import { generateParams } from './utils';
    import StandardsBar from './StandardsBar.svelte';

    let filterElem:SvelteComponent;
    let standardsBar:SvelteComponent;
    export let filter:boolean=true
    export let linkTo:boolean=false

    let urlParams:URLSearchParams;

    let url:string = '/'
    let loaded:boolean=false;
    let term:string="";

    let expanded:boolean=true;
    let standardsExpanded:boolean=false
    
    let showError = false
    let URLerror = false;

    let params = ''

    function updateUrl(word:string):string {
        // console.log("Updating url...")

        // Set new params
        const filterParams = filterElem.getParams()
        filterParams['sol'] = standardsBar.getStandards()
        if(term) { filterParams['q'] = [term]}
        // console.log("Params from filter:", filterParams)

        const params = generateParams(filterParams)
        // console.log("URL Params:", params.size)
        
        if(params.size > 0) {
            url = `${base}/library/search?${params.toString()}`
        } else {
            url = `${base}/library/search?error=invalid`
        }
        return url
    }

    $: console.log(url)

    function toggle():null {
        expanded = !expanded
        return null
    }

    $: if(loaded) { url = updateUrl(term) }

    onMount(()=>{
        urlParams= $page.url.searchParams
        term = (urlParams && urlParams.has('q') ? urlParams.get('q') : '') as string
        if($page.url.searchParams.has('error')) {
            showError = true
        }
        
        loaded=true;
    })
</script>

<div class='searchbox my-5'>
    {#if URLerror}
    <article transition:slide class="message is-danger">
        <div class="message-header">
          <p class='m-0 p-0'>Malformed URL!</p>
          <button on:click={() => {URLerror = false}} class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
            The URL you used to visit this page was malformed, and we were not able to filter results from our library. Use the form and filters below to search our library, or <a href='{base}/library/browse'>browse our collections</a> to find what you need.
        </div>
    </article>
    {/if}
    <div class='field has-addons'>
        <div class='control is-expanded'>
            <input bind:value={term} class='input is-large' type='text' placeholder="Search for materials...">
        </div>
        {#if filter}
        <div class='control'>
            <button on:click={toggle} data-tooltip="Filters" href='{url}' class='has-tooltip-arrow filter-button button is-large'>
                <Fa icon={faFilter} />
                <Fa class='ml-3' icon={faCaretDown} />
            </button>
        </div>
        {/if}
        <div data-sveltekit-reload class='control'>
            <a href='{url}' class='button is-large is-primary'>
                <span class='is-hidden-mobile'>Search</span>
                <Fa class='ml-3' icon={faSearch} />
            </a>
        </div>
    </div>
    
    <div class='filters {expanded? '':'hidden'}'>
        <Filters on:change={() => updateUrl(term)} bind:this={filterElem}>
            <button on:click={()=>{ standardsExpanded = !standardsExpanded}} class='standard-trigger button is-small is-fullwidth is-dark'>
                Filter by Standard
                <Fa class='ml-3' icon={standardsExpanded ? faCaretDown : faCaretLeft} />
            </button>
        </Filters>
        
    </div>
    

    {#if showError}
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

    <StandardsBar on:change={() => updateUrl(term)} bind:this={standardsBar} show={standardsExpanded} />
    
</div>

<style>
    .standard-trigger {
        margin-top: 1.3rem;
    }
    .filters.hidden {
        display: none;
    }
    .filter-button {
        border-color: none;
    }
    .searchbox {
        margin-right: auto;
        margin-left: auto;
        /* padding: 0 0; */
    }
    /* .filters {
        background-color: whitesmoke;
    } */
</style>