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

    export let position:number; // tracks the vertical position of the row in the table (0 indexed)

    export let title:string
    export let description:string
    export let duration:number = 1
    export let sols:Standard[] = []
    export let suggestedSOLs:Standard[] = []
    export let csols:Standard[] = []
    export let lessons:Frontmatter[] = []

    let edit = false
    let empty = true
    let hoveredIDs:string[] = []

    async function processSubmit(event:any) {
        edit = false
        const obj = event.detail
        if(obj) {
            empty = false
            title = obj.title ? obj.title : title
            description = obj.description ? obj.description : description
            duration = obj.duration ? obj.duration : duration
            
            // Sort CS SOLs away from non-CS
            sols = obj.sols.filter((obj:Standard) => {
                return !obj.subject.includes("Computer Science")
            })
            csols = obj.sols.filter((obj:Standard) => {
                return obj.subject.includes("Computer Science")
            })

            // Get lesson plans related to the CS SOLs and the non-CS SOLs
            // Lessons must include AT LEAST one of the provided SOLs and one CS SOL

            // Construct API endpoint URL & fetch data
            let url = `${base}/api/library/search.json?`
            for(const sol of obj.sols) {
                url += 'sol=' + sol.id + "&"
            }
            const res = await (await fetch(url)).json()
            
            // update lessons
            lessons = (res.results as Frontmatter[]).filter((obj:Frontmatter) => obj.types.includes("Lesson Plan"))

            // Find suggested CS SOLs from lessons
            suggestedSOLs = []
            let selectedIDs:Standard[] = []
            for(const o of obj.sols) {
                selectedIDs = [...selectedIDs, o.id]
            }
            for(const lesson of lessons) {
                const sols = lesson.standards && lesson.standards.length > 0 ? lesson.standards : []
                for(const s of sols) {
                    let obj = await (await fetch(`${base}/api/standards/${s}.json`)).json()
                    let cs = obj.filter((obj:Standard) => {
                        return obj.subject.includes('Computer Science') && !selectedIDs.includes(obj.id)
                    })
                    suggestedSOLs = [...suggestedSOLs, ...cs]
                }
            }
        }
    }

    function hoverHighlight(lesson:Frontmatter) {
        hoveredIDs = lesson.standards
    }
</script>

<tr>
    {#if edit}
    <td class='form-row' colspan=5>
        <Form on:submit={processSubmit} />
    </td>
    {:else if empty}
    <td class='empty-row' colspan=5>
        <div on:click={() => edit = true}>
            <Fa icon={faPlus} />
            <span>Add a unit...</span>
        </div>
    </td>
    {:else}
    <td>{duration}</td>
    <td>{title}<br>{@html description}</td>
    <td>
        {#each sols as sol}
        <StandardTag theme={hoveredIDs.includes(sol.id) ? 'is-warning' : 'is-dark'} status={true} standard={sol} id={false} del={false} />
        {/each}
    </td>
    <td>
        <div class='{csols.length > 0 ? 'mb-3' : ''}'>
            {#each csols as sol}
            <StandardTag theme={hoveredIDs.includes(sol.id) ? 'is-warning' : 'is-dark'} status={true} standard={sol} id={false} del={false} />
            {/each}
        </div>
        <div>
            <i>Suggested:</i>
            {#each suggestedSOLs as sol}
            <StandardTag theme={hoveredIDs.includes(sol.id) ? 'is-warning' : 'is-dark'} status={true} standard={sol} id={false} del={false} />
            {/each}
        </div>
    </td>
    <td class='content'>
        <ul>
            {#each lessons as lesson}
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
        <button class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Edit"><Fa icon={faEdit} /></button>
        <button class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Move Up"><Fa icon={faArrowUp} /></button>
        <button class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Move Down"><Fa icon={faArrowDown} /></button>
        <button class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Add Row Below"><Fa icon={faPlus} /></button>
        <button class='button is-fullwidth has-tooltip-right has-tooltip-arrow' data-tooltip="Delete"><Fa icon={faTrash} /></button>
        {/if}
    </td>
</tr>


<style lang='scss'>
    .ui > button {
        display: block;
        width: 3rem;
        margin: 3px 0;
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
        }
        div {
            display: flex;
            flex-grow: 1;
            align-items: center;
            justify-content: center;
            height: 4rem;
            font-size: 1.5rem;
            span {
                margin-left: 1rem;
            }
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>