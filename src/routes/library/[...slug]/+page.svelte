<!-- Lesson group page -->
<script>
    export let data;
    import ElementView from '$lib/components/ElementView.svelte';
    import FileTreeView from '$lib/components/FileTreeView.svelte';

    import {onMount} from 'svelte'

    onMount(()=>{
        console.log(data)
    })
</script>

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