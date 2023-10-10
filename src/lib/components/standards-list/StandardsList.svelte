<script lang='ts'>
    import {onMount} from 'svelte'
    
    import ChecklistDropdown from "./ChecklistDropdown.svelte";
    import type {NestedDropdown} from './ChecklistDropdown.svelte'
    
    import ListView from './ListView.svelte';
    import {renderGradesAsStrings, gradesByBandToList, fullGradeNames, gradeList, condenseDashNotation} from '$lib/utils/metaUtils'
    import type {ListedStandards, GradesByBand} from '$lib/utils/metaUtils'

    export let standards:Promise<ListedStandards>
    
    let filteredStandards:object[] = []
    // let standards:Promise<ListedStandards>

    

    
    let listView:any;
    let showOrClose:boolean = false
    let loaded:boolean = false

    
    export let standardsObjs:object[] = []
    export let preselect:URLSearchParams;

    onMount(() => {
        standards.then(() => {
            loaded = true
        })
    })

    // $: filteredStandards = filterStandards(selectedGrades, selectedSubjects, standards)

    function filterStandards(grades, subjects, standards) {
        let filtered = {}

        // Add indices for grade levels
        let gradeList = gradesByBandToList(grades)
        filtered = Object.fromEntries(Object.entries(standards).filter(([key]) => {
            return gradeList.includes(key)
        }));

        for(const grade in filtered) {
            // get subjects
            filtered[grade] = Object.fromEntries(Object.entries(standards[grade]).filter(([key]) => {
                return subjects[key] && subjects[key].includes(key)? true : false
            }));

            // // get strands
            for(const subj in filtered[grade]) {
                filtered[grade][subj] = Object.fromEntries(Object.entries(standards[grade][subj]).filter(([key]) => {
                    return subjects[subj].includes(key)? true : false
                }));
            }
        }

        

        if(listView && loaded) {
            showOrClose = listView.updateListStatus(listView.getStatus())
        }
        return filtered
    }

    
</script>

<div class='standards-list'>
    <label for='standards' class='label'>Standards</label>
        <div class='field'>
            <slot />
            <button on:click={() => {showOrClose = listView.updateListStatus()}} class='button is-small is-secondary {loaded? 'is-loading':''}'>
                {showOrClose? 'Close List':'Show Standards'}
            </button>
        </div>
        <div class='list-view-wrapper'>
            <!-- <ListView bind:this={listView} bind:selectedStandards={standardsObjs} contents={filteredStandards}></ListView> -->
        </div>
</div>

<style>
    label {
        font-size: 8pt;
    }
    button {
        width: 10rem;
    }
    .hidden {
        display: none;
    }
    .list-view-wrapper {
        /* border-left: 1px;
        border-left-style: solid;
        border-left-color: black; */
        width: 100%;
        overflow-x: visible;
    }
</style>
