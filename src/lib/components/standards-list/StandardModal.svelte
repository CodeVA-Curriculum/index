<script lang='ts'>
    import Fa from 'svelte-fa'
    import {faClose} from '@fortawesome/free-solid-svg-icons'
    export let active = false
    export let standards:any
    import { onMount } from 'svelte';
    import SingleStandardModalBody from './SingleStandardModalBody.svelte';
    import TableRow from './TableRow.svelte';

    export function deactivate() {
        active = false
    }
    export function activate() {
        active = true
    }

    // TODO: implement
    // If there's only one standard, it gets pushed to el
    // As long as el has a value, the Standard at el gets displayed
    // Otherwise, the modal shows the list
    // When the user clicks on a TableRow, it pushes its data up to el
    // Clicking "back" in the SingleStandardModal modifies el to null
    let el
    onMount(() => {
        if(standards.length == 1) {
            el = SingleStandardModalBody
        }
    })
</script>

<div class="modal {active? 'is-active' : ''}">
    <div on:click={deactivate} class="modal-background"></div>
    <div class="modal-card">
        <!-- <section class='modal-card-body'> -->
            {#if el}
                <svelte:component this={el} on:close={deactivate} standard={standards[0]} />
                <!-- <SingleStandardModalBody standard={standards[0]} /> -->
            {:else}
                {#each standards as standard}
                <TableRow standard={standard} />
                {/each}
            {/if}
        <!-- </section> -->
        <!-- <header class='modal-card-head'>
            <h1 class='modal-card-title'>{standard.title}
                <span class='ml-5 tag is-dark'>Algorithms & Programming</span>
                <span class='tag is-dark'>Kindergarten</span>
            </h1>
            <button on:click={deactivate} class="button closer" aria-label="close"><Fa size='1.25x' icon={faClose} /></button>
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
        </footer> -->
        
        <!-- <footer class="modal-card-foot">
            <button on:click={handler} class="button {standardSelected? 'is-dark':'is-success'} is-hovered">
                <Fa class='mr-3' icon={icon} />
                {standardSelected? "Remove From":"Add To"} Search Filter
            </button>
            <button on:click={()=>active=false} class="button">Close</button>
        </footer> -->
    </div>
</div>