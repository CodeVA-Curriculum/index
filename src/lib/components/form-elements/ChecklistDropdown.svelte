<script lang='ts'>
    import {onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faCaretDown, faChevronDown} from '@fortawesome/free-solid-svg-icons'
    import Collapse from '../Collapse.svelte';

    export let title:string = "No Title"
    export let id:string = 'no-id'
    export let items:any = {}

    export let selected:any = {}

    function manageToggle(e:any, subject:string) {
        if(e.target.checked) {
            selected[subject] = [...items[subject], subject]
        } else {
            selected[subject] = []
        }
        
    }
    
</script>

<div class='checklist-dropdown control dropdown is-hoverable'>
    <div class='dropdown-trigger'>
        <button class='button is-small'>{title}<Fa class='ml-2' icon={faChevronDown} /></button>
    </div>
    <div class='dropdown-menu' id={id} role='menu'>
        <div class='dropdown-content'>
            {#each Object.entries(items) as [index, arr]}
            <Collapse>
                <label slot="heading" class="checkbox dropdown-item">
                    <input
                        class='mr-1'
                        on:change={(e)=>{manageToggle(e, index)}}
                        type="checkbox"
                        value={index}
                        bind:group={selected[index]}
                    >
                    <span>{index}</span>
                </label>
                <div class='collapsible'>
                    {#each arr as item}
                    <label class="ml-5 checkbox dropdown-item">
                        <input 
                            class='mr-1'
                            bind:group={selected[index]}
                            value={item}
                            type="checkbox"
                        >
                        {item}
                    </label>
                    {/each}
                </div>
            </Collapse>
            {/each}
        </div>
    </div>
</div>

<style>
    label {
        font-size: 8pt;
    }
</style>