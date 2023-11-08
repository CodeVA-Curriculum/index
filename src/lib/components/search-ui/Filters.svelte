<script lang='ts'>
    import {SvelteComponent, createEventDispatcher, onMount} from 'svelte'
    import {base} from '$app/paths'
    import CheckBoxDropdown from '../form-elements/CheckBoxDropdown.svelte';
    import InputWithDropdown from '../form-elements/InputWithDropdown.svelte';
    import { expandDashNotation, fullGradeNames, gradeList, type GradesByBand } from '$lib/utils/metaUtils'
    import FetchingDropdown from '../dropdowns/FetchingDropdown.svelte';
    import Fa from 'svelte-fa'
    import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';
    import type { Params } from './utils';
    import { page } from '$app/stores'
    
    let res = {
        subjects: [],
        grades: {},
        audiences: [],
        types: [],
        tags: []
    }
    let params:Params = {
        subj:  [],
        aud:   [],
        type:  [],
        grade: [],
        tag:   []
    }
    const paramToResMap = {
        subj: 'subjects',
        grade: 'grades',
        aud: 'audiences',
        tag: 'tags',
        type: 'types'
    }
    let gradeStart:string[] = []
    let loaded = false
    onMount(async () => {
        const url = $page.url.searchParams
        res = await (await fetch(`${base}/api/library/meta`)).json()

        // Get parameters from URL & add to preset filter
        for(const key in params) {
            if(key != 'grade' && key !='sol' && key != 'q') {
                console.log(key)
                params[key] = url.has(key) ? url.getAll(key) : []
                // Make sure there aren't any illegal parameters in the url that end up getting injected into the UI
                params[key] = params[key].filter((str) => {return res[paramToResMap[key]].includes(str)})
            }
        }

        // Process grade URL parameters
        let grades = expandDashNotation(url.has('grade') ? url.getAll('grade') : [])
        for(let i=0;i<grades.length;i++) {
            grades[i] = fullGradeNames[gradeList.indexOf(grades[i])]
        }
        gradeStart = grades
        loaded = true
    })

    $: sendUpdate(params)

    export function getParams():Params {
        return params
    }

    const dispatch = createEventDispatcher()
    function sendUpdate(params:Params) {
        dispatch('change')
    }

    // $: sendUpdate(selectedStandards, subjects, tags, grades, types, audiences)
</script>

<div class='field m-0 has-text-left filters is-flex'>
        <div class='control has-text-left'>
            <div class='wrap'>
                <label for='subjects-dropdown' class='label small'>Subjects</label>
                <FetchingDropdown 
                    title="Select..."
                    id='subjects-dropdown'
                    items={res.subjects}
                    bind:selected={params.subj}
                />
            </div>
        </div>
        <div class='control has-text-left'>
            <div class='wrap'>
                <label for='grades-dropdown' class='label small'>Grades</label>
                <FetchingDropdown 
                    title="Select..."
                    id='grades-dropdown'
                    items={res.grades}
                    flat={false}
                    width={'10rem'}
                    bind:selected={params.grade}
                    start={gradeStart}
                />
            </div>
        </div>
        <div class='control has-text-left'>
            <div class='wrap'>
                <label for='audiences-dropdown' class='label small'>Audiences</label>
                <FetchingDropdown 
                    title="Select..."
                    id='audiences-dropdown'
                    items={res.audiences}
                    bind:selected={params.aud}
                />
            </div>
        </div>
        <div class='control has-text-left'>
            <div class='wrap'>
                <label class='label small' for='audiences-dropdown' >Resource Types</label>
                <FetchingDropdown 
                    title="Select..."
                    id='audiences-dropdown'
                    items={res.types}
                    bind:selected={params.type}
                />
            </div>
        </div>
        <div class='control has-text-left'>
            <div class='wrap input-item'>
                <label for='tag-select' class='label small'>Tags</label>
                <InputWithDropdown 
                    id='tag-select' 
                    tagsList={res.tags} 
                    placeholder="Type to search..." 
                    bind:selected={params.tag}
                />
            </div>
        </div>
        <div class='end-of-bar'>
            <slot />
        </div>
</div>


<style>
    .filters > div {
        display: inline-block;
        margin: 0 0.25rem;
    }
    .filters {
        flex-wrap: wrap;
    }
    .hidden {
        display: none;
    }
    label {
        text-align: left;
        font-size: 8pt;
        position: relative;
        top: 2px;
    }
    .end-of-bar {
        flex-grow: 1;
    }
</style>