<script lang='ts'>
    export let data:any;
    import {onMount} from 'svelte'

    onMount(() => {
        console.log(data)
    })
</script>

<div class='search'>
    <p>Search bar</p>

</div>