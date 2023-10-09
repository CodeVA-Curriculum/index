<script lang='ts'>
    import {onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faCaretDown, faChevronDown} from '@fortawesome/free-solid-svg-icons'
    import Collapse from '../Collapse.svelte';

    export let title:string = "No Title"
    export let id:string = 'no-id'
    export let items:any
    export let width:string = 'auto'
    export let start:any

    export let selected:any = {}

    function manageToggle(e:any, subject:string) {
        if(e.target.checked) {
            selected[subject] = [...items[subject], subject]
        } else {
            selected[subject] = []
        }
        
    }
    function turnOffParent(e:any, parent:string, item:string) {
        if(!e.target.checked && selected[parent].includes(parent) && selected[parent].length == 2) {
            selected[parent] = selected[parent].filter(obj => obj != parent && obj != item)
        }
        if(e.target.checked && selected[parent].length+1 == items[parent].length) {
            selected[parent] = [parent, ...selected[parent], item]
        }
    }

    let loaded = false
    $: {
        if(!loaded && start && items) {
            if(typeof(start) == typeof('str')) {
                selected[start] = [...items[start], start]
            } else {
                for(let i=0;i<start.length;i++) {
                    selected[start[i]] = [...items[start[i]], start[i]]
                }
            }
            loaded = true
        }
    }

    onMount(() => {
        if(!start) {
            loaded = true
        }
    })

    let length = 0
    $: {
        length = 0
        for(const parent in selected) {
            if(selected[parent].length > 0) {
                length++
            }
        }
    }
    
</script>

<div class='checklist-dropdown control dropdown is-hoverable'>
    <div class='dropdown-trigger'>
        <button class='button is-small is-fullwidth'>
            {title}
            <span class='number-pill mx-1'>{length}</span>
            <Fa class='ml-2' icon={faChevronDown} />
        </button>
    </div>
    <div class='dropdown-menu' id={id} role='menu'>
        <div style='width: {width};' class='dropdown-content'>
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
                <span slot='label'>
                    {#if selected[index] && selected[index].length > 0}
                    <span class='number-pill'>
                        {selected[index].length > items[index].length? items[index].length : selected[index].length}
                    </span>
                    {/if}
                </span>
                <div class='collapsible'>
                    {#each arr as item}
                    <label class="ml-5 checkbox dropdown-item">
                        <input 
                            on:change={(e)=>{turnOffParent(e, index, item)}}
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