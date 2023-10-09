<script lang='ts'>
    import {onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
    import Collapse from '../Collapse.svelte';

    export let title:string = "No Title"
    export let id:string = 'no-id'
    export let items:any = {}
    export let width:string = 'auto'

    export let selected:string[] = []
    
</script>

<div class='checklist-dropdown control dropdown is-hoverable'>
    <div class='dropdown-trigger'>
        <button class='button is-small is-fullwidth'>
            {title}
            <span class='number-pill mx-1'>{selected.length}</span>
            <Fa class='ml-2' icon={faChevronDown} />
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
    .number-pill {
        background-color: whitesmoke;
        font-size: 8pt;
        padding: 0 5px;
        border-radius: 20px;
    }
    .checklist-dropdown > .dropdown-trigger {
        width: 7rem;
    }
    label {
        font-size: 8pt;
    }
</style>