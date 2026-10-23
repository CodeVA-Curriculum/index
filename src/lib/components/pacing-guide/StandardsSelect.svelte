<script lang='ts'>
  import Pill from '$lib/components/Pill.svelte'
    import Standard from '$lib/components/Standard.svelte'
    import StandardInList from '$lib/components/pacing-guide/StandardInList.svelte'
    import { onMount } from "svelte";
    import Fa from 'svelte-fa'
    import {faAdd, faPlus, faHome, faArrowRotateLeft, faX} from '@fortawesome/free-solid-svg-icons'
    import { getViewSelectedFields } from "drizzle-orm";

    let { selected = $bindable([]), onclose } = $props()

    let workingMap = $state({})
    let wholeMap = $state({})
    onMount(async () => {
        const { map } = await (await fetch("/api/v1/standards.json")).json()
        workingMap = map
        wholeMap = workingMap
    })

    const titles = [ "Grades", "Subjects", "Standards"]
    let breadcrumbs = $state([])

    let open = $state(false)
    function edit() { open = true }
    function close() { open = false; onclose(selected) }
    let menuIndex = $state(0)
    let lastMenu = $state("")
    function menuChange(clicked:string) {
        console.log("click", clicked)
        if(clicked && workingMap[clicked]) {
            console.log("nav forward")
            workingMap = workingMap[clicked] // pass the next object in the map to the workingMap
            breadcrumbs.push(clicked)
            menuIndex++
        } else {
            if(clicked) {
                console.log("nav back")
                // try to go back
                const key = breadcrumbs[0]
                console.log(key)
                console.log("breadcrumbs", breadcrumbs)
                workingMap = wholeMap[key]
                menuIndex--
                breadcrumbs = [ breadcrumbs[0] ]
            } else {
                console.log("reset")
                workingMap = wholeMap // reset to home nav
                menuIndex = 0
                breadcrumbs = []
            }
        }
        if(menuIndex == 2) {
            let firstIndex = Number(workingMap[0].abbr.split(".")[3])
            let sortByIndex = true
            for(let i=1;i<workingMap.length;i++) {
                const s = workingMap[i]
                const index = Number(s.abbr.split('.')[3])
                if(index == firstIndex) {
                    sortByIndex = false
                    break
                }
            }
            if(sortByIndex) {
                console.log("reordering...")
                workingMap.sort((a,b) => a.abbr.split('.')[3] - b.abbr.split('.')[3])
            }
            
        }
    }
    function remove(i) {
        selected.splice(i, 1)
    }
    function addToSelected(obj) {
        console.log("Adding to list of selected Standards")
        selected.push(obj)
        console.log(selected)
    }
    function getAll(map) {
        if(map[0]) {
            return map
        } else {
            let all = []
            for(const [k,v] of Object.entries(map)) {
                all = [...all, ...getAll(v)]
            }
            return all
        }
    }
    function count(map) {
        if(map[0]) {
            return map.length
        } else {
            let total = 0
            for(const [k,v] of Object.entries(map)) {
                total += count(v)
            }
            return total
        }
    }
    function addAll(map) {
        const objs = getAll(map)
        selected.push(...objs)
    }
</script>

{#snippet selectedStandardsBox(selected)}
<div class='pills'>
    {#each selected as obj, i}
    <Standard obj={obj}>
    <button onclick={() => remove(i)} class='icon'><Fa size=.75x icon={faX}  /></button>
    </Standard>
    {/each}
</div>
{/snippet}


<div class='standards-box'>
    {@render selectedStandardsBox(selected)}
    <button class='empty' onclick={edit}><span><Fa icon={faPlus} /></span>Filter By Standard</button>
</div>

<dialog open={open}>
<article class='open'>
    <button class='close' onclick={close}>
    </button>
    <div class="list" >
    <div class='bread'>
        <nav aria-label="breadcrumb">
            <ul>
                <li><a onclick={() => menuChange()}><Fa icon={faHome} /></a></li>
                {#each breadcrumbs as bc, i}
                    <li>
                        {#if i < breadcrumbs.length - 1}
                        <a onclick={() => menuChange(bc)}>{bc}</a>
                        {:else}
                        <span>{bc}</span>
                        {/if}
                    </li>
                {/each}
            </ul>
        </nav>
    </div>
        <div class='heading'>

            <p>Select standards from the list below. Confirm your choices by clicking the button below or closing this window.</p>
            <div style='padding-left: 0.5rem;'>
            {@render selectedStandardsBox(selected)}
            <div class='confirm'>
                <button onclick={close} class='success'>Confirm</button>
                <button onclick={() => { selected = [] }} class='secondary'>Clear</button>
            </div>
            </div>

        </div>
        <hr>
        {#each Object.entries(workingMap) as [k,v]}
            <div class='list-item'>
            {#if menuIndex == 2}
            <StandardInList selected={selected} onadd={(obj) => addToSelected(obj)} obj={v} />
            {:else}
            <p onclick={() => menuChange(k)}><a >{k}</a></p>
            <div class='ui'>
                <button onclick={() => addAll(v)}>
                    <Fa icon={faPlus} />
                    <span>Add All</span>
                    <Pill>{count(v)}</Pill>
                </button>
            </div>
            {/if}
            </div>
        {/each}
    </div>
</article>
</dialog>


<style lang='scss'>
    .list-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        & p { flex: 1; }
        .ui { visibility: hidden; flex: 0 1; 
            button {
                margin: 8px 12px;
                display: flex;
                flex-direction: row;
                gap: 8px;
                align-items: center;
                white-space: nowrap;
                font-size: 14pt;
                background-color: white;
                font-style: italic;
                color: black;
                border-color: black;
                padding: 4px 12px;
            }
        }
        &:hover {
            background-color: whitesmoke;
          .ui { visibility: visible; }  
        }
    }
    .open {
        position: relative;
        button.close {
            margin: 0;
            background-color: white;
            flex: 0 1;
            border: none;
            color: black;
            position: absolute;
            right: 1rem;
        }
    }
    .empty { flex: 0 1; span { margin-right: 8px; } white-space: nowrap; }
    .bread {
        width:586px;
        margin-left: 1rem;
        nav {
            ul {
                display: flex;
                li { position: relative; }
                // li::after {
                //     display: flex;
                //     position: absolute;
                //     right: -1.25rem;
                //     top: 0.5rem;
                // }
            }
        }
    }
    p {
        padding: 12px; margin: 0;
    }
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
            border-color: black;
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
    .heading {
        width: 100%;
        position: relative;
        text-align: right;
        p { text-align: left; }
        .confirm { font-size: 14pt; color: white; padding-right: 12px; padding-top: 12px;}
        button {
            margin: 0 4px;
            padding: 4px 24px;
            flex: 0 1;
            border: none;
        }
    }
  .standards-box {
    flex: 1;
    padding-top: 8px;
    display:flex;
    flex-direction: row;
    button { flex: 0 1; span { margin-right: 8px; } white-space: nowrap; }
  }
    .pills {
        min-height: 3rem;
        flex: 1 0;
        display: flex;
        flex-direction:row;
        flex-wrap: wrap;
        background-color: whitesmoke;
        margin-right: 12px;
        padding: 8px;
        gap: 4px;
    }
</style>

