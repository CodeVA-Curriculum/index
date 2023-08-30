<script lang='ts'>
    import Projects from "$lib/components/Projects.svelte";
    import Search from "$lib/components/Search.svelte";
    import {onMount} from 'svelte'
    export let data;
    let groups:any = [];

    onMount(()=> {
        groups = data.content;
    })
</script>

<div class='content has-text-centered'>
    <div class='section'>
        <h1>Search the Library</h1>
        <p>Use the search bar below to browse CodeVA's library of <strong>dozens of computer science lesson plans</strong> across all grades K-12. Use the filters to narrow down your search, or check out our curriculum projects listed below!</p>
        <Search />
    </div>
    <div class='section'>
        <h1>Our Projects</h1>
        <Projects elems={groups} />
    </div>
</div>