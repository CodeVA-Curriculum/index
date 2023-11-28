<script lang='ts'>
    import type { Standard } from "$lib/utils/metaUtils";
    import Fa from 'svelte-fa'
    import {faClose} from '@fortawesome/free-solid-svg-icons'

    export let standards:Standard[] = []
    export let id:string

    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();
    function sendClose() {
		dispatch('close');
	}
    function selectStandard(standard:Standard) {
        dispatch('select', {standard: standard})
    }

    onMount(() => {
        // TODO: Get info from ID for header

    })
</script>

<div class='modal-card-head'>
    <h1 class='modal-card-title'>{id}
        <!-- <span class='ml-5 tag is-dark'>{standard.strand}</span> -->
        <!-- <span class='tag is-dark'>{standard.grade}</span> -->
    </h1>
    <button on:click={sendClose} class="button closer" aria-label="close"><Fa size='1.25x' icon={faClose} /></button>
</div>
<div class='modal-card-body'>
    <table class='table'>
        <tr class='headings'>
            <th style='width: 3rem;'>Title</th>
            <th style='width: 4rem;'>ID</th>
            <th>Text</th>
        </tr>
        {#each standards as standard, i}
        <tr on:click={() => selectStandard(standard)} class='stds'>
            <td>{standard.title}</td>
            <td><span class='tag is-dark is-small'>{standard.id}</span></td>
            <td class='text'>
                {standard.text}
                {#each standard.subs as sub}
                    {sub}
                {/each}
            </td>
        </tr>
        {/each}
    </table>
</div>

<style>
    .text {
        max-width: 8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 0;
        margin-right:0;
    }
    .stds:hover {
        background-color: whitesmoke;
        cursor: pointer;
    }
</style>