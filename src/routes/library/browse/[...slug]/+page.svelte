<!-- Lesson group page -->
<script lang='ts'>
    import type {Element} from '$lib/utils/elementTypes'
    export let data:Element;

    import ElementView from '$lib/components/element-views/ElementView.svelte';
    // import FileTreeView from '$lib/components/FileTreeView.svelte';

    import {onMount} from 'svelte'

    onMount(()=>{
        // console.log(data)
    })
</script>

<svelte:head>
    <title>{data.frontmatter.title} | CodeVA Curriculum Library</title>
</svelte:head>

<div class='container is-max-desktop'>
<div class='section'>
    <!-- <div class='column is-one-quarter'> -->
        <!-- <FileTreeView /> -->
    <!-- </div> -->
    <!-- <div class='column'> -->
        <ElementView data={data} />
    <!-- </div> -->
</div>
</div>