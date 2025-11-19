<script lang='ts'>
    import Fa from 'svelte-fa'
    import {faClose} from '@fortawesome/free-solid-svg-icons'
    export let active = false
    export let standards:any
    export let id:string
    import { onMount } from 'svelte';
    import SingleStandardModalBody from './SingleStandardModalBody.svelte';
    import TableRow from './TableRow.svelte';

    export function deactivate() {
        if(back) {
            active = true
            el = null
            back = false
        } else {
            active = false
        }
    }
    export function activate() {
        active = true
    }

    function select(event) {
        el = SingleStandardModalBody
        selected = event.detail.standard
        back = true
    }
    let selected:Standard
    let back:boolean = false

    // TODO: implement
    // If there's only one standard, it gets pushed to el
    // As long as el has a value, the Standard at el gets displayed
    // Otherwise, the modal shows the list
    // When the user clicks on a TableRow, it pushes its data up to el
    // Clicking "back" in the SingleStandardModal modifies el to null
    let el
    onMount(() => {
        selected = standards[0]
        if(standards.length == 1) {
            el = SingleStandardModalBody
        }
    })
</script>

<div class="modal {active? 'is-active' : ''}">
    <div on:click={deactivate} class="modal-background"></div>
    <div class="wrap modal-card content">
        {#if el}
            <SingleStandardModalBody back={back} on:close={deactivate} standard={selected} />
        {:else}
            <TableRow on:select={select} on:close={deactivate} id={id} standards={standards} />            
        {/if}
        <footer class='modal-card-foot'>
            <slot name="footer" />
        </footer>
    </div>
</div>

<style>
    .wrap {
        font-style: normal;
        font-size: medium;
    }
</style>