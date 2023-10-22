<script lang='ts'>
    import { onMount } from "svelte";

    export let options:string[]
    export let defaultOption:string
    // export let label:string
    export let selected = ''

    onMount(() => {
        selected = defaultOption
    })
</script>

<!-- Must have element with class `field` as direct parent -->
<div class='control drop-down column is-one-fifth m-0 mr-2 my-2 p-0'>
    <!-- <label class='label'>{label}</label> -->
    <div class='select is-fullwidth m-0 p-0'>
        <select bind:value={selected} name='audience'>
            <option value={defaultOption}>{defaultOption}</option>
            {#each options as opt}
            <option value={opt}>{opt}</option>
            {/each}
        </select>
    </div>
</div>

<style>
    .drop-down {
        padding: 0 0;
        margin: 0 0;
    }
</style>