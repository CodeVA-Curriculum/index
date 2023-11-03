<script lang='ts'>
    import Fa from 'svelte-fa'
    import {faClose} from '@fortawesome/free-solid-svg-icons'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    function sendClose() {
		dispatch('close');
	}
    export let standard:any
</script>

<div class='modal-card'>
    <header class='modal-card-head'>
        <h1 class='modal-card-title'>{standard.title}
            <span class='ml-5 tag is-dark'>Algorithms & Programming</span>
            <span class='tag is-dark'>Kindergarten</span>
        </h1>
        <!-- TODO: deactivate bind call -->
        <button on:click={sendClose} class="button closer" aria-label="close"><Fa size='1.25x' icon={faClose} /></button>
    </header>
    <section class='modal-card-body'>
        <p>{standard.text}</p>
        {#if standard.subs.length > 0}
        <ol type='a'>
            {#each standard.subs as sub}
            <li>{sub}</li>
            {/each}
        </ol>
        {/if}
    </section>
    <footer class='modal-card-foot'>
        <slot name="footer" />
    </footer>
</div>