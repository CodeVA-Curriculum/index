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
    
    export let items:NestedDropdown = {}

    export let width:string = 'auto'
    export let start:string[]

    let selected:NestedDropdown = {}
    export let output:string[] = []

    let loaded = false
    onMount(() => {
        if(!start) {
            loaded = true
        }
    })

    // TODO: this sucks
    $: {
        if(!loaded && start && Object.entries(items).length > 0) {
            for(let i=0;i<start.length;i++) {
                if(items[start[i]] && !selected[start[i]]) { // the start value is a subject, and needs to be given an index
                    selected[start[i]] = [start[i]]
                } else {
                    for(const subj in items) {
                        if(items[subj].includes(start[i])) {
                            selected[subj] = [...(selected[subj]? selected[subj]: []), start[i]]
                            if(selected[subj].length == items[subj].length) {
                                selected[subj] = [...selected[subj], subj]
                            }
                            break
                        }
                    }
                }
            }
            loaded = true
        }
    }

    let length = 0
    $: length = getLength(selected)

    function getLength(selected:NestedDropdown):number {
        let length = 0
        output = []
        for(const parent in selected) {
            if(selected[parent].length > 0) {
                length++
                for(let i=0;i<selected[parent].length;i++) {
                    if(!output.includes(selected[parent][i])) {
                        output = [...output, selected[parent][i]]
                    }
                }
            }
        }
        return length
    }

    function manageToggle(e:any, subject:string) {
        if(e.target.checked) {
            selected[subject] = [...items[subject], subject]
        } else {
            selected[subject] = []
        }
        
    }
    function turnOffParent(e:any, parent:string, item:string) {
        if(!e.target.checked && selected[parent].includes(parent)) {
            selected[parent] = selected[parent].filter((obj:string) => obj != parent && obj != item)
            if(selected[parent].length != 0) {
                selected[parent] = [...selected[parent], parent]
            }
        }
        if(e.target.checked) {
            selected[parent] = [parent, ...selected[parent], item]
        }
    }
</script>

<div class='checklist-dropdown control dropdown is-hoverable'>
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
                        {selected[index].length > items[index].length? items[index].length : selected[index].length-1}
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