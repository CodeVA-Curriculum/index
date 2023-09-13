<script lang='ts'>
    import {page} from '$app/stores'
    import {goto} from '$app/navigation'
    import {onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faCaretDown, faFilter} from '@fortawesome/free-solid-svg-icons'
    import {slide} from 'svelte/transition'

    export let filter:boolean=true

    let url:string = '/'
    let loaded:boolean=false;
    let term:string="";
    let expanded:boolean=false;

    interface SearchParams {
        term:string
    }

    let params:SearchParams = {
        term: ''
    }

    // TODO: Change the URL based on search parameters
    function updateUrl(word:string):null {
        if(loaded) {
            $page.url.searchParams.set('term',word); 
            goto(`?${$page.url.searchParams.toString()}`);
        }
        return null
    }
    function toggle():null {
        expanded = !expanded
        return null
    }

    onMount(()=>{
        loaded=true;
    })
</script>

<div class='searchbox my-5'>
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
        <div class='control'>
            <button on:click={updateUrl(term)} class='button is-large is-primary'>Search</button>
        </div>
        
    </div>
    {#if expanded}
    <div transition:slide class='card'>
        <div class='card-content'>
            filters
        </div>
    </div>
    {/if}
</div>

<style>
    .filter-button {
        border-color: none;
    }
    .searchbox {
        margin-right: auto;
        margin-left: auto;
        /* padding: 0 0; */
    }
</style>