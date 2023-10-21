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

    export let data:URLSearchParams;

    let url:string = '/'
    let loaded:boolean=false;
    let term:string="";
    let expanded:boolean=true;
    
    let showError = false
    let URLerror = false;

    // let params = ''

    function updateUrl(word:string):string {
        
        const urlData = new URLSearchParams()
        // if(loaded) {
        // delete old params
        // for(const [k,v] of $page.url.searchParams.entries()) {
        //     $page.url.searchParams.delete(k)
        // }

        // Set new params
        if(term && term.length > 0) { urlData.set('query', term) }
        let params = filterElem.getParams()
        for(const [k,v] of Object.entries(params)) {
            urlData.set(k, v[0])
            for(let i=1;i<v.length;i++) {
                urlData.append(k, v[i])
            }
        }
        // TODO: fix this so we aren't using goto & we aren't using $page.url
        if(urlData.size > 0) {
            // goto(`${base}/library/search?${$page.url.searchParams.toString()}`, {
            //     replaceState: true,
            //     invalidateAll: true
            // });
            // console.log("Going to", `${base}/library/search?${urlData.toString()}`)
            return `${base}/library/search?${urlData.toString()}`
        }
        return `${base}/library/search?error=invalid}`
    }
    function toggle():null {
        expanded = !expanded
        return null
    }

    onMount(()=>{
        term = data ? data.get('query') : ''
        if(data && data.has('error')) {
            showError = true
        }
        
        loaded=true;
    })

    // $: console.log(url)
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
            <input on:change={() => {url=updateUrl(term)}} bind:value={term} class='input is-large' type='text' placeholder="Search for materials...">
        </div>
        {#if filter}
        <div class='control'>
            <button on:click={toggle} data-tooltip="Filters" class='has-tooltip-arrow filter-button button is-large'>
                <Fa icon={faFilter} />
                <Fa class='ml-3' icon={faCaretDown} />
            </button>
        </div>
        {/if}
        <div class='control'>
            <a data-sveltekit-reload href='{url}' class='button is-large is-primary'>Search</a>
        </div>
        
    </div>
    
    <div class='filters {expanded? '':'hidden'}'>
        <!-- TODO: add on:change to update URL when filters updated -->
            <Filters on:change={()=>{url = updateUrl(term)}} data={data} bind:this={filterElem} />
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