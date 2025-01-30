<script lang='ts'>
    import { faEdit } from "@fortawesome/free-regular-svg-icons";
    import { base } from '$app/paths'
    import type { Row } from "./_data";
    import Fa from 'svelte-fa'
    import Carousel from "./Carousel.svelte";
    import { faArrowDown, faArrowUp, faPlus, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
    import Form from "./Form.svelte";
    import Unit from "./Unit.svelte";
    import type { Standard } from "$lib/utils/metaUtils";
    import StandardTag from "$lib/components/standards-list/StandardTag.svelte";
    import type { Frontmatter } from "$lib/utils/frontmatter";
    import { createEventDispatcher } from "svelte";

    

    export let position:number; // tracks the vertical position of the row in the table (0 indexed)

    export let entries:Row = {
        title: '',
        description: '',
        duration: 1,
        sols: [],
        suggestedSOLs: [],
        csols: [],
        lessons: []
    }
    

    let edit = false
    export let empty = true
    let hoveredIDs:string[] = []

    async function processSubmit(event:any) {
        edit = false
        const obj = event.detail
        if(obj) {
            empty = false
            entries.title = obj.title ? obj.title : entries.title
            entries.description = obj.description ? obj.description : entries.description
            entries.duration = obj.duration ? obj.duration : entries.duration
            
            // Sort CS SOLs away from non-CS
            entries.sols = obj.sols.filter((obj:Standard) => {
                return !obj.subject.includes("Computer Science")
            })
            entries.csols = obj.sols.filter((obj:Standard) => {
                return obj.subject.includes("Computer Science")
            })

            // Get lesson plans related to the CS SOLs and the non-CS SOLs
            // Lessons must include AT LEAST one of the provided SOLs and one CS SOL

            // Construct API endpoint URL & fetch data
            let url = `${base}/api/library/search.json?`
            for(const sol of obj.sols) {
                url += 'sol=' + sol.id + "&"
            }
            
            // update lessons
            if(obj.sols.length > 0) {
                const res = await (await fetch(url)).json()
                entries.lessons = (res.results as Frontmatter[]).filter((obj:Frontmatter) => obj.types.includes("Lesson Plan"))
            } 

            // Find suggested CS SOLs from lessons
            entries.suggestedSOLs = []
            let selectedIDs:string[] = []
            for(const o of obj.sols) {
                selectedIDs = [...selectedIDs, o.id]
            }
            for(const lesson of entries.lessons) {
                const sols = lesson.standards && lesson.standards.length > 0 ? lesson.standards : []
                for(const s of sols) {
                    let obj = await (await fetch(`${base}/api/standards/${s}.json`)).json()
                    let cs = obj.filter((obj:Standard) => {
                        return obj.subject.includes('Computer Science') && !selectedIDs.includes(obj.id)
                    })
                    entries.suggestedSOLs = [...entries.suggestedSOLs, ...cs]
                }
            }
        }
        dispatch('change', entries)
    }

    function hoverHighlight(lesson:Frontmatter) {
        hoveredIDs = lesson.standards
    }

    function clear() {
        entries = {
            title: '',
            description: '',
            duration: 1,
            sols: [],
            csols: [],
            suggestedSOLs: [],
            lessons: []
        }
        empty = true;
    }
    const dispatch = createEventDispatcher()
    function move(direction:'up'|'down'|'add') {
        dispatch(direction, position)
    }

    function editRow() {
        edit = true
        move('add')
    }
</script>

<tr>
    {#if edit}
    <td class='form-row' colspan=5>
        <Form on:submit={processSubmit} entries={entries} />
    </td>
    {:else if empty}
    <td class='empty-row' colspan=5>
        <div on:click={editRow}>
            <Fa icon={faPlus} />
            <span>Add a unit...</span>
        </div>
    </td>
    {:else}
    <td>{entries.duration + position}</td>
    <td>{entries.title}<br>{@html entries.description}</td>
    <td>
        {#each entries.sols as sol}
        <StandardTag theme={hoveredIDs.includes(sol.id) ? 'is-warning' : 'is-dark'} status={true} standard={sol} id={false} del={false} />
        {/each}
    </td>
    <td>
        <div class='{entries.csols.length > 0 ? 'mb-3' : ''}'>
            {#each entries.csols as sol}
            <StandardTag theme={hoveredIDs.includes(sol.id) ? 'is-warning' : 'is-dark'} status={true} standard={sol} id={false} del={false} />
            {/each}
        </div>
        <div>
            {#if entries.suggestedSOLs.length == 0}
            <i>No suggested CS SOLs</i>
            {:else}
            <i>Suggested:</i>
            {/if}

            {#each entries.suggestedSOLs as sol}
            <StandardTag theme={hoveredIDs.includes(sol.id) ? 'is-warning' : 'is-dark'} status={true} standard={sol} id={false} del={false} />
            {/each}
        </div>
    </td>
    <td class='content'>
        <ul>
            {#each entries.lessons as lesson}
            <li>
                <a 
                    on:mouseenter={() => hoverHighlight(lesson)}
                    on:mouseleave={() => hoveredIDs = []} 
                    href="{base}/library/browse/{lesson.pathData.path.replace('.md', '')}" 
                    target="_blank"
                >
                    {lesson.title}
                </a>
            </li>
            {/each}
        </ul>
    </td>
    {/if}
    <td class='ui'>
        {#if !edit && !empty}
            <button on:click={() => edit = true} class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Edit"><Fa icon={faEdit} /></button>
            <button on:click={()=>move('up')} class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Move Up"><Fa icon={faArrowUp} /></button>
            <button on:click={()=>move('down')} class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Move Down"><Fa icon={faArrowDown} /></button>
            <button on:click={()=>move('add')} class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Add Row Below"><Fa icon={faPlus} /></button>
            <button on:click={clear} class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Delete"><Fa icon={faTrash} /></button>
        {:else}
            <div class='filler'></div>
        {/if}
    </td>
</tr>


<style lang='scss'>
    .filler {
        width: 3rem;
        background-color: pink;
        position: relative;
    }
    .ui > button {
        display: block;
        width: 3rem;
        margin: 3px 0;
    }
    .ui {
        position: relative;
    }
    .ui {
        border: none;
        visibility: hidden;
        background-color: white;
    }
    tr:hover > .ui {
        visibility: visible;
    }
    .form-row {
        // border: none;
        background-color: white;
    }
    .empty-row {
        // display: flex;
        align-items: center;
        justify-content: center;
        color: grey;
        &:hover {
            background-color: whitesmoke;
            cursor: pointer;
        }
        div {
            display: flex;
            flex-grow: 1;
            align-items: center;
            justify-content: center;
            height: 11rem;
            font-size: 1.5rem;
            span {
                margin-left: 1rem;
            }
        }
    }
</style>