<script lang='ts'>
    import StandardInList from '$lib/components/pacing-guide/StandardInList.svelte'
    import { onMount } from "svelte";
    import Fa from 'svelte-fa'
    import {faAdd, faHome, faArrowRotateLeft, faX} from '@fortawesome/free-solid-svg-icons'
    import { getViewSelectedFields } from "drizzle-orm";

    let { selected = $bindable([]), standards, map } = $props()

    const titles = [ "Grades", "Subjects", "Standards"]
    let breadcrumbs = $state([])

    let workingMap = $state(map)
    let open = $state(false)
    function edit() { open = true }
    function close() { open = false }
    let menuIndex = $state(0)
    let lastMenu = $state("")
    function menuChange(clicked:string) {
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
                console.log(map[key])
                workingMap = map[key]
                menuIndex--
                breadcrumbs = [ breadcrumbs[0] ]
            } else {
                console.log("reset")
                workingMap = map // reset to home nav
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
                    console.log(index, firstIndex)
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
</script>

<button class='empty' onclick={edit}>
    <Fa icon={faAdd} />
    <span>Add</span>
</button>
<div class='tags'>
{#each selected as obj, i}
<span class='tag'><span>{obj.abbr}</span> <button onclick={() => remove(i)} class='icon'><Fa icon={faX}  /></button></span>
{/each}
</div>

<aside class:open >
    <div class='bread'>
        <nav aria-label="breadcrumb">
            <ul>
                <li><a onclick={() => menuChange()}><Fa icon={faHome} /></a></li>
                {#each breadcrumbs as bc, i}
                    <li><a onclick={() => menuChange(i == 0 ? null : bc)}>{bc}</a></li>
                {/each}
            </ul>
        </nav>
    </div>
    <div class="list" >
        <div class='heading'>
        <h3>Select SOLs</h3>
        <button onclick={close}>
            <Fa icon={faX} />
        </button>
        </div>
        <hr>
        {#each Object.entries(workingMap) as [k,v]}
            {#if menuIndex == 2}
            <StandardInList bind:selected={selected} obj={v} />
            {:else}
            <p onclick={() => menuChange(k)}><a >{k}</a></p>
            {/if}
        {/each}
    </div>
</aside>


<style lang='scss'>
    .bread {
        width:586px;
        margin-left: 1rem;
        nav {
            ul {
                display: flex;
            }
        }
    }
    div.list {
        width: 586px;
        position: absolute;
        left: 0;
        top: 0;
        background-color: white;
        padding: 1rem;
    }
    div.list { position: relative; }
    aside {
        width: 0;
        position: absolute;
        left: 0;
        top: 0;
        overflow-y: scroll;
    }
    p {
        padding: 12px; margin: 0;
        &:hover { background-color: whitesmoke; cursor: pointer;  }
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
        display: flex;
        flex-direction: row;
        align-items: center;
        h3 { flex: 1 0; }
        button {
            margin: 0;
            background-color: white;
            flex: 0 1;
            border: none;
            color: black;
        }
    }
    .open {
        width: 586px;
    }
    .tag {
        border-radius: 8px;
        padding: 0;
        display: flex;
        align-items: center;
        span { flex: 1; margin-right: 12px; }
        button {
            background-color: transparent;
            border: none;
            flex: 0 1;
            padding: 0;
            position: relative;
            top: 2px;
            align-items: center;
        }
    }
    .tags {
        display: flex;
        flex-direction: row;
    }
</style>

