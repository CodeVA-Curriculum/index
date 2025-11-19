<script lang='ts'>
    import Projects from "$lib/components/Projects.svelte";
    import Search from "$lib/components/search-ui/Search.svelte";
    import {onMount} from 'svelte'
    import Acknowledge from "$lib/components/Acknowledge.svelte";
    import { page } from "$app/stores";
    import { censorTitles } from "$lib/utils/censor.js";
    export let data;
    let groups:any = [];

    let urlData:URLSearchParams

    let showDonate = true;

    onMount(()=> {
        urlData = $page.url.searchParams
        groups = censorTitles(data.projects);
    })
</script>

<svelte:head>
    <title>Search the CodeVA Curriculum Library</title>
    <meta name="CodeVA Curriculum Library" content="Find free, sharable, and remixable computer science lessons, curricular resources, tutorials, and more aligned to the Virginia Computer Science Standards of Learning.">
</svelte:head>

<div class='has-text-centered'>
    <div class='section'>
        <h1 class='title is-2'>Search the Library</h1>
        
        <p class='block'>Use the search bar below to browse CodeVA's library of <strong>dozens of computer science lesson plans</strong> across all grades K-12. Use the filters to narrow down your search, or check out our curriculum projects listed below!</p>
        <Search filter={false} />
        {#if showDonate}
        <article class='message'>
            <div class='message-header'>
                <p>Support Our Work!</p>
                <button on:click={()=> showDonate=!showDonate} class="delete" aria-label="delete"></button>
            </div>
            <div class='message-body'>
                <p style="color: black;" class='block has-text-left'>Thousands of educators across Virginia rely on CodeVA's Curriculum Library to bring computer science into their classrooms. This library is made possible by the support of individuals like you, alongside our partners and sponsors. If these resources help you build a stronger future for students, please consider making a gift. Whether $10, $25 or $100, every contribution helps expand access to essential learning resources.</p>
                <div class='columns is-tablet'>
                    <div class='column'>
                        <a href="https://app.hubspot.com/payments/purchase/hscs_d16qUamtR7hEt0Q5avDzgfGx4fKcRmYMTwP5jTC0T6hbnt1Bc8SpNR0dMBlPayR6?referrer=CMS_MODULE_NEWTAB" class='donate button is-primary is-fullwidth'>Donate & Support Us!</a>
                    </div>
                    <div class='column'>
                        <a href="https://codevirginia.org/donate-now" class='button is-fullwidth'>Learn More</a>
                    </div>
                </div>
            </div>
        </article>
        {/if}
    </div>
    
    <div class='section'>
        <h1 class='title is-2'>Our Projects</h1>
        <p style='margin-bottom: 3rem'>Check out our project groups below! You can use the dropdowns to filter the list to what you need, or search for a specific project using the search bar above.</p>
        <Projects elems={groups} />
    </div>
    
</div>

<Acknowledge />

<style lang='scss'>
    // @import '$lib/styles/colors';
    // .donate { background-color: $green;}
</style>