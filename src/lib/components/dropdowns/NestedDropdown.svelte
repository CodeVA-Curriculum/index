<script lang='ts' context='module'>
    export interface NestedDropdown {
        [propName:string]: string[];
    };
</script>

<script lang='ts'>
    import {onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faCaretDown, faChevronDown} from '@fortawesome/free-solid-svg-icons'
    import Collapse from '../Collapse.svelte';

    export let title:string = "No Title"
    export let id:string = 'no-id'
    export let width:string = 'auto'
    
    export let items:NestedDropdown = {}
    export let start:string[]
    let selectedItems:NestedDropdown = {}

    export let selected:string[] = []

    let loaded = false
    onMount(() => {
        // console.log("Starting Nested Dropdown with", selected)
        if(!start) {
            loaded = true
        }
    })

    $: {
        if(!loaded && start && Object.entries(items).length > 0) {
            console.log("Processing Start", start)
            for(const k in items) {
                selectedItems[k] = []
                for(let i=0;i<start.length;i++) {
                    console.log(items[k])
                    if(items[k].includes(start[i])) {
                        selectedItems[k] = [...selectedItems[k], start[i], k]
                    }
                }
                if(start.includes(k) && !selected[k].includes(k)) {
                    selectedItems[k] = [...selectedItems[k], k]
                    if(selectedItems[k].length == 1) { selectedItems[k] = [...items[k], k] }
                }
                // anything gets selected, add parent to selected
            }
            // console.log(selectedItems)
            loaded = true
        }
    }

    let length = 0
    $: length = getLength(selectedItems)

    function getLength(selectedItems:NestedDropdown):number {
        let length = 0
        selected = []
        for(const parent in selectedItems) {
            if(selectedItems[parent].length > 0) {
                length++
                for(let i=0;i<selectedItems[parent].length;i++) {
                    if(!selected.includes(selectedItems[parent][i])) {
                        selected = [...selected, selectedItems[parent][i]]
                    }
                }
            }
        }
        return length
    }

    function manageToggle(e:any, subject:string) {
        if(e.target.checked) {
            selectedItems[subject] = [...items[subject], subject]
        } else {
            selectedItems[subject] = []
        }
        
    }
    function turnOffParent(e:any, parent:string, item:string) {
        if(!e.target.checked && selectedItems[parent].includes(parent)) {
            selectedItems[parent] = selectedItems[parent].filter((obj:string) => obj != parent && obj != item)
            if(selectedItems[parent].length != 0) {
                selectedItems[parent] = [...selectedItems[parent], parent]
            }
        }
        if(e.target.checked) {
            selectedItems[parent] = [parent, ...selectedItems[parent], item]
        }
    }
</script>

<div class='checklist-dropdown dropdown is-hoverable'>
    <div class='dropdown-trigger'>
        <button class='button is-small is-fullwidth'>
            {title}
            <span class='number-pill mx-1'>{length !=0? length:''}</span>
            <Fa class='ml-2' icon={faChevronDown} />
        </button>
    </div>
    <div class='dropdown-menu' id={id} role='menu'>
        <div style='width: {width};' class='dropdown-content'>
            {#each Object.entries(items) as [index, arr]}
            <Collapse showDrop={arr.length > 0}>
                <label slot="heading" class="checkbox dropdown-item">
                    <input
                        class='mr-1'
                        on:change={(e)=>{manageToggle(e, index)}}
                        type="checkbox"
                        value={index}
                        bind:group={selectedItems[index]}
                    >
                    <span>{index}</span>
                </label>
                <span slot='label'>
                    {#if selectedItems[index] && selectedItems[index].length > 0}
                    <span class='number-pill'>
                        {selectedItems[index].length > items[index].length? items[index].length : selectedItems[index].length-1}
                    </span>
                    {/if}
                </span>
                <div class='collapsible'>
                    {#each arr as item}
                    <label class="ml-5 checkbox dropdown-item">
                        <input 
                            on:change={(e)=>{turnOffParent(e, index, item)}}
                            class='mr-1'
                            bind:group={selectedItems[index]}
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