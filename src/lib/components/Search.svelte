<script lang='ts'>
    import {page} from '$app/stores'
    import {goto} from '$app/navigation'
    import {base} from '$app/paths'
    import {SvelteComponent, onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faCaretDown, faFilter} from '@fortawesome/free-solid-svg-icons'
    import {slide} from 'svelte/transition'

    // components
    import Filters from '$lib/components/form-elements/Filters.svelte'

    let filterElem:SvelteComponent;
    export let filter:boolean=true
    export let linkTo:boolean=false

    export let data:object;

    let url:string = '/'
    let loaded:boolean=false;
    let term:string="";
    let expanded:boolean=true;
    
    let showError = false
    let URLerror = false;

    let params = ''

    function updateUrl(word:string):null {
        
        // if(loaded) {
        // delete old params
        for(const [k,v] of $page.url.searchParams.entries()) {
            $page.url.searchParams.delete(k)
        }

        // Set new params
        if(term && term.length > 0) { $page.url.searchParams.set('query', term) }
        params = filterElem.getParams()
        for(const [k,v] of Object.entries(params)) {
            $page.url.searchParams.set(k, v[0])
            for(let i=1;i<v.length;i++) {
                $page.url.searchParams.append(k, v[i])
            }
        }
        // $page.url.searchParams.sort()
        if($page.url.searchParams.size > 0) {
            goto(`${base}/library/search?${$page.url.searchParams.toString()}`, {
                replaceState: true,
                invalidateAll: true
            });
        } else {
            showError = true
        }
        return null
    }
    function toggle():null {
        expanded = !expanded
        return null
    }

    onMount(()=>{
        term = data ? data.get('query') : ''
        
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
        <div class='control'>
            <button on:click={updateUrl(term)} class='button is-large is-primary'>Search</button>
        </div>
        
    </div>
    
    <div class='filters {expanded? '':'hidden'}'>
            <Filters data={data} bind:this={filterElem} bind:params={params} />
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
    
</div>

<style>
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