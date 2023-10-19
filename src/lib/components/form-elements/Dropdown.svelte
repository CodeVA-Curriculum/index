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
<control class='control drop-down'>
    <!-- <label class='label'>{label}</label> -->
    <div class='select'>
        <select bind:value={selected} name='audience'>
            <option value={defaultOption}>{defaultOption}</option>
            {#each options as opt}
            <option value={opt}>{opt}</option>
            {/each}
        </select>
    </div>
</control>