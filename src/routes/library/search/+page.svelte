<script lang='ts'>
    export let data:any;
    import Search from '$lib/components/Search.svelte';
    import {onMount} from 'svelte'

    onMount(() => {
        console.log(data)
    })
</script>

<div class='search content has-text-centered'>
    <div class='section'>
        <h1>Search Our Library</h1>
        <div class='has-text-left my-5'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <Search />
        <hr>
    </div>
    
    <div class='section'>
        <p><i>No Results</i></p>
    </div>
</div>

<style>
    h1 {
        margin-top: 6rem;
    }
    p {
        color: grey;
    }
</style>