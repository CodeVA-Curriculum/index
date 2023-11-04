<script lang='ts'>
    import {SvelteComponent, createEventDispatcher, onMount} from 'svelte'
    import {base} from '$app/paths'
    import CheckBoxDropdown from '../form-elements/CheckBoxDropdown.svelte';
    import InputWithDropdown from '../form-elements/InputWithDropdown.svelte';
    import type { GradesByBand } from '$lib/utils/metaUtils'
    import FetchingDropdown from '../dropdowns/FetchingDropdown.svelte';
    import Fa from 'svelte-fa'
    import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';
    import type { Params } from './utils';

    export let startingUrl:URLSearchParams
    
    let res = {
        subjects: [],
        grades: {},
        audiences: [],
        types: []
    }
    let params:Params = {
        subj:  [],
        aud:   [],
        type:  [],
        grade: [],
        tag:   []

    }
    let loaded = false
    onMount(async () => {
        res = await (await fetch(`${base}/api/library/meta`)).json()
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
        <button class='standard-trigger button is-small is-fullwidth-mobile is-dark'>
            Standards
            <Fa class='ml-3' icon={faCaretDown} />
        </button>
</div>


<style>
    .filters > div {
        display: inline-block;
        margin: 0 0.25rem;
    }
    .filters {
        flex-wrap: wrap;
    }
    .level {
        text-align: left;
    }
    .standard-trigger {
        margin-top: 1.3rem;
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
    button {
        flex-grow: 1;
    }
</style>