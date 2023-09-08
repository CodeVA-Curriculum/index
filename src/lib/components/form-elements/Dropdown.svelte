<script lang='ts'>
    export let options:string[]
    export let defaultOption:string
    export let label:string
</script>

<!-- Must have element with class `field` as direct parent -->
<control class='control drop-down'>
    <!-- <label class='label'>{label}</label> -->
    <div class='select'>
        <select name='audience'>
            <option value={defaultOption}>{defaultOption}</option>
            {#each options as opt}
            <option value={opt}>{opt}</option>
            {/each}
        </select>
    </div>
</control>