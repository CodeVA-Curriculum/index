<script lang='ts'>
    import type { Standard } from "$lib/utils/metaUtils";
    import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'
    import { createEventDispatcher } from "svelte";

    export let standard:Standard

    const dispatch = createEventDispatcher()
    function deactivate() {
        dispatch('close')
    }
</script>

<div class='card'>
    <header class='card-header'>
        <h1 class='card-header-title pb-3 m-0'>{standard.title}
            <span class='ml-5 tag is-dark'>{standard.strand}</span>
            <span class='ml-3 tag is-dark'>{standard.grade}</span>
        </h1>
        <button on:click={deactivate} class="card-header-icon" aria-label="close"><Fa size='1.25x' icon={faClose} /></button>
    </header>
    <section class='card-content'>
        <p>{standard.text}</p>
        {#if standard.subs.length > 0}
        <ol type='a'>
            {#each standard.subs as sub}
            <li>{sub}</li>
            {/each}
        </ol>
        {/if}
    </section>
    <footer class='card-footer has-text-centered'>
        <a class='card-footer-item'>Add to Search<Fa icon={faPlus} class='ml-2' /></a>
        <a class='card-footer-item'>See Related Materials</a>
    </footer>
</div>

<style>
    .card {
        /* width: 25%; */
    }
    button {
        position: absolute;
        right: 0;
        top: 0.5rem;
    }
</style>