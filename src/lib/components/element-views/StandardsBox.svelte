<script lang='ts'>
    import StandardTag from "../standards-list/StandardTag.svelte";
    export let standards = []
    let active = true;
</script>

<!-- TODO: Make this its own component -->
<div id='standards-box' class='sidebar standards'>
    <h3>Standards</h3>
    <p style='font-size: 10pt;' class='is-italic'>Click to Read SOLs</p>
    <div class='pills {active? 'full':'full'}'>
    {#each standards as standard}
        <StandardTag status={true} get={true} theme='is-light' id={standard} />
    {/each}
    </div>
    <!-- <button tabindex="0" aria-expanded={active} aria-controls='standards-box' on:click={()=>{ active = !active }}>See {active? 'Less':'More'}</button> -->
</div>

<style lang='scss'>
    @import '$lib/styles/colors.scss';
    .standards > button {
        border: none;
        background-color: transparent;
        float: right;
        font-style: italic;
        &:hover {
            color: #0070E0;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .standards {
        padding-bottom: 1.75rem;
    }
    .pills {
        &.full {
            max-height: auto;
            overflow-y: auto;
        }
        &.collapsed {
            max-height: 2.5rem;
            overflow-y: hidden;
        }
    }
    .sidebar {
        margin-bottom: 3rem;
        background-color: $light-green;
        padding: 1rem 1rem;
    }
</style>