<script lang='ts'>
    import { onMount } from "svelte";
    import {base} from '$app/paths'
    import RichEditor from "./RichEditor.svelte";
    import 'quill/dist/quill.snow.css'
    import { getAllSubjects, getSubjectParent, type KeyEntry } from "$api/utils";
    import { fullGradeNames, gradeList, type Standard } from "$lib/utils/metaUtils";
    import StandardsBar from "$lib/components/search-ui/StandardsBar.svelte";
    import StandardList from "$lib/components/search-ui/StandardList.svelte";
    import StrandTable from "$lib/components/search-ui/StrandTable.svelte";
    import StandardTag from "$lib/components/standards-list/StandardTag.svelte";
    import { faTrash } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'
    import { createEventDispatcher } from "svelte";
    import type { Row } from "./_data";

    const dispatch = createEventDispatcher()

    const options = {
        theme: 'snow',
        placeholder: ''
    }

    export let entries:Row = {
        title: '',
        description: '',
        sols: [],
        csols: [],
        suggestedSOLs: [],
        duration: 1,
        lessons: []
    }

    let data = ''
    let text = ''
    let html = ''

    const onTextChange = (event:any) => {
        ;({text, html} = event?.detail ?? {})
        entries.description = html
    }

    let selectedSubject:string = 'Select subject area...'
    let selectedGrade:string = 'Select grade level...'
    // let selectedStandards:Standard [] = []
    let formFilled = false
    $: formFilled = selectedSubject != 'Select subject area...' && selectedGrade != 'Select grade level...'

    let subjects:KeyEntry[] = []
    let filteredSubjs:KeyEntry[] = []
    let grades:string[] = fullGradeNames
    let standards:any

    

    onMount(async () => {
        const res = await (await fetch(`${base}/api/standards/subjects.json`)).json()
        subjects = await getAllSubjects(res)
        standards = await (await fetch(`${base}/api/standards/object.json`)).json()
    })
    
    function clear() {
        entries.sols = []
    }

    $: filterSubjects(selectedGrade)
    function filterSubjects(grade:string) {
        const abbrGrade = gradeList[fullGradeNames.indexOf(grade)]
        filteredSubjs = subjects.filter((obj) => {
            return (abbrGrade == obj.grade || !obj.grade) && standards[grade][obj.title]
        })
        // console.log(abbrGrade, subjects)
        
    }

    function submit() {
        dispatch('submit', entries)
    }
    function cancel() {
        dispatch('submit')
    }
    
</script>

<div class='unit-form'>
    <div class="columns is-tablet">
        <div class='column'>
            <label class="label">Unit Name</label>
            <div class="control is-expanded">
                <input bind:value={entries.title} class="input" type="text" placeholder="Type the unit title here...">
            </div>
        </div>
        <div class='column is-2'>
            <label class="label">Duration (Weeks)</label>
            <div class="control">
                <input bind:value={entries.duration} class="input" type="number">
            </div>
        </div>
    </div>
      
    <div class='columns'>
        <div class="field column">
            <label class="label">Unit Description</label>
            <div class="control">
                <RichEditor on:text-change={onTextChange} {options} {data} />
            </div>
        </div>
        <div class="column">
            <label class='label'>SOLs Addressed in this Unit</label>
            <div class='sol-list'>
                {#each entries.sols as standard, i}
                <StandardTag status={true} standard={standard} id={false} del={false} />
                <!-- {standard.id} -->
                {/each}
                {#if entries.sols.length > 0}
                <button on:click={clear} class='tag'>
                    <!-- <Fa icon={faTrash} /> -->
                    <span>Delete</span>
                </button>
                {/if}
            </div>
            <div class="field is-grouped">
                <div class="control is-expanded">
                    <span class="dropdown select is-fullwidth">
                        <select bind:value={selectedGrade}>
                            <option selected>Select grade level...</option>
                            {#each grades as grade}
                            <option>{grade}</option>
                            {/each}
                        </select>
                    </span>
                </div>
                <div class="control is-expanded">
                    <span class="dropdown select is-fullwidth">
                        <select bind:value={selectedSubject}>
                            <option selected>Select subject area...</option>
                            {#each filteredSubjs as subject}
                            <option>{subject.title}</option>
                            {/each}
                        </select>
                    </span>
                </div>
            </div>
            {#if formFilled}
            <div class='helper'>
                <table>
                    {#each Object.entries(standards[selectedGrade][selectedSubject]) as [k,v]}
                    <StrandTable bind:inFilter={entries.sols} title={k} standards={v} />
                    <!-- {k} {v} -->
                    {/each}
                </table>
            </div>
            {/if}
        </div>
    </div>
    
    <div class="field is-grouped">
        <div class="control">
            <button on:click={submit} class="button is-link">Submit</button>
        </div>
        <div class="control">
            <button on:click={cancel} class="button is-link is-light">Cancel</button>
        </div>
    </div>
</div>

<style lang='scss'>
    table {
        // background-color: pink;
        width: 100%;
    }
    input, select {
        border-radius: 0;
    }
    .sol-list {
        background-color: whitesmoke;
        min-height: 2rem;
        padding: 0.5rem 0.5rem;
        margin: 0.5rem 0;
    }
    .unit-form {
        // border: 4px solid gray;
        padding: 2rem 2rem;
        // position: relative;
    }
    .top {
        & > label {
            position: absolute;
        }
    }
    .helper {
        // height: 75px;
        font-style: italic;
        color: black;
        // background-color: pink;
    }
</style>