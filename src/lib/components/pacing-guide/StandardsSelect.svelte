<script lang='ts'>
    import { onMount } from "svelte";
    import Fa from 'svelte-fa'
    import {faAdd, faArrowRotateLeft, faX} from '@fortawesome/free-solid-svg-icons'
    import { getViewSelectedFields } from "drizzle-orm";

    let { selectedIds = $bindable() } = $props()

    let standards:any = $state()
    let workingObj:any = $state()
    let selected = $state([])
    let map:any = $state()
    let indices:string[] = $state([])
    let loaded = $state(false)
    let open = $state(false)
    onMount(async () => {
        // load standards from API
        standards = await (await fetch(`https://curriculum.codevirginia.org/api/standards/object.json`)).json()
        loaded = true
        map = standards["courseToSubjectMap"]
        delete standards["courseToSubjectMap"]
        workingObj = standards
    })
    function nav(key:string, value?:any) {
        if(!indices.includes(key)) {
            indices.push(key)
        } else {
            // remove everything after the one that was clicked
            const i = indices.indexOf(key)
            indices.splice(i+1)
            if(i == 0 && indices.length == 1) {
                indices = []
            }
        }
        let wo = standards
        for(let i=0;i<indices.length;i++) {
            wo = wo[indices[i]]
        }
        workingObj = wo
    }
    function edit() { open = true }
    function close() { open = false }
    function add(obj:any) {
        selected.push(obj)
        selectedIds.push(obj["id"])
    }
    function remove(obj:any) {
        let index = -1
        for(let i=0;i<selected.length;i++) {
            if(selected[i]["id"] == obj["id"]) {
                index = i
                break
            }
        }
        selected.splice(index, 1)
        for(let i=0;i<selectedIds.length;i++) {
            if(selectedIds[i] == obj["id"]) {
                index = i
                break
            }
        }
        selectedIds.splice(index, 1)
    }
</script>

<button class='empty' onclick={edit}>
    <Fa icon={faAdd} />
    <span>Add</span>
</button>
{#each selected as obj}
<span class='tag'>{obj["id"]} <button onclick={() => remove(obj)} class='icon'><Fa icon={faX} size=0.25/></button></span>
{/each}

<dialog open={open}>
  <article>
    <header>
        <nav aria-label="breadcrumb">
            <ul>
                {#each indices as index}
                <li><a onclick={() => nav(index)}>{index}</a></li>
                {/each}
            </ul>
            
        </nav>
        <button onclick={close} aria-label="Close" rel="prev"></button>
    </header>
    {#if loaded}
        {#each Object.entries(workingObj) as [key,value]}
            {#if isNaN((key as unknown) as number)}
            <div class='item'>
                <button onclick={() => nav(key, value)}>{key}</button>
            </div>
            {:else}
            <div class='item'>
                <div class='standard'>
                    <div class='top'>
                        <span class='title'>{value["id"]}</span>
                        {#if selectedIds.includes(value["id"])}
                        <button onclick={() => remove(value)}>
                            Remove from Pacing Guide
                        </button>
                        {:else}
                        <button onclick={() => add(value)}>
                            Add to Pacing Guide
                        </button>
                        {/if}
                    </div>
                    <p>{value["text"]}</p>
                </div>
            </div>
            {/if}
        {/each}
    {/if}
  </article>
</dialog>

<style lang='scss'>
    .empty {
        background-color: white;
        color: black;
        padding: 10px 1rem;
        font-size: 12pt;
        margin-bottom: 0.5rem;
    }
    header {
        height: 4rem;
        position: relative;
        font-size: 12pt;
        button { right: 1rem; top: 1.75rem; position: absolute;}
    }
    .item {
        
        border-bottom: 1px solid whitesmoke;
        
        button {
            padding: 0.5rem 0.5rem;
            background-color: white;
            color: black;
            width: 100%;
            text-align: left;
            border: none;
            &:hover {
                        background-color: whitesmoke;
                    }
        }
    }
    .standard {
        p {
            margin: 0.5rem;
        }
        .title {
            font-weight: bold;
            flex-grow: 4;
            padding-left: 0.5rem;
        }
        margin: 1rem 0;
        button {
            border: 1px solid black;
            padding: 0.5rem;
        }
        .top {
            display: flex;
            flex-direction: row;
            align-items: center;
            button { flex-shrink: 1; width: auto; font-size: 12pt; padding: 10px; }
        }
    }
</style>

