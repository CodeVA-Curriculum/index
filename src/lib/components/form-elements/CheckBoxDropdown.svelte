<script lang='ts'>
    import {onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
    import Collapse from '../Collapse.svelte';
    import { clickOutside } from '$lib/utils/interactions';

    export let title:string = "No Title"
    export let id:string = 'no-id'
    export let items:string[] = []
    export let width:string = 'auto'

    export let selected:string[] = []

    let expanded = false

    function handleClickOutside(event: any) {
		expanded = false;
	}
    
</script>

<div use:clickOutside on:click_outside={handleClickOutside} class='checklist-dropdown control dropdown {expanded? 'is-active': ''} is-hoverable m-0 p-0'>
    <div class='dropdown-trigger m-0 p-0'>
        <button on:click={()=>expanded=!expanded} class='button is-small is-fullwidth m-0'>
            {title}
            <span class='number-pill mx-1'>{selected.length != 0? selected.length:''}</span>
            <Fa class='' icon={faChevronDown} />
        </button>
    </div>
    <div class='dropdown-menu' id={id} role='menu'>
        <div style='width: {width};' class='dropdown-content'>
            {#each items as item}
                <label class="checkbox dropdown-item">
                    <input
                        class='mr-1'
                        type="checkbox"
                        value={item}
                        bind:group={selected}
                    >
                    <span>{item}</span>
                </label>
            {/each}
        </div>
    </div>
</div>

<style>
    .dropdown {
        width: 100%;
    }
    .number-pill {
        background-color: whitesmoke;
        font-size: 8pt;
        padding: 0 5px;
        border-radius: 20px;
    }
    label {
        font-size: 8pt;
    }
    .checklist-dropdown {
        padding: 0 0;
    }
    .dropdown-trigger {
        width: 100%;
    }
</style>