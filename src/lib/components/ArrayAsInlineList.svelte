<script lang='ts'>
    import { onMount } from "svelte";

    export let items:(string|number)[]
    export let title:string="Lorem ipsum"

    // onMount(()=>{
    //     if(typeof(items)==typeof('string')) {
    //         items = [items]
    //     }
    // })
</script>

<div class='lister metadata'>
    <p><strong>{title}{items.length>1? 's':''}:</strong>
        {#each items as item, i}
        {i!=0? ', ':''}{item}
        {/each}
    </p>
</div>

<style>
    p {
        font-size: smaller;
        margin: 0 0;
    }
</style>