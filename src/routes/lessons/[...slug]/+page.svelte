<!-- Lesson group page -->
<script>
    export let data;
    import DocumentHeader from '$lib/components/DocumentHeader.svelte';

    import {onMount} from 'svelte'

    onMount(()=>{
        console.log(data)
    })
</script>

<div class='document section content'>
    <DocumentHeader meta={data.metadata} />
    <hr>
    <div class='columns'>
        <div class='column is-two-thirds'>
            {@html data.content}
        </div>
        <div class='column'>
            <div class='sidebar'>
                <h3>Standards</h3>
                <p>Lorem ipsum</p>
            </div>
            <div class='sidebar'>
                <h3>Tags</h3>
                <p>Lorem ipsum</p>
            </div>
            
        </div>
    </div>
    
</div>

<style lang='scss'>
    @import '$lib/styles/colors.scss';
    .sidebar {
        margin-bottom: 3rem;
        background-color: $light-green;
        padding: 1rem 1rem;
    }
</style>