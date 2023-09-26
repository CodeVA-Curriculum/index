<script lang='ts'>
    import {onMount} from 'svelte'
    
    import ChecklistDropdown from "./ChecklistDropdown.svelte";
    import ListView from './ListView.svelte';
    
    let subjects:object|false = false
    let grades:object|false = false
    let selectedSubjects:object|false = false
    let selectedGrades:object|false = false

    interface StrandsObject {
        'Algorithms & Programming'?:number[]
    }

    interface SubjectsObject {
        'Computer Science'?:StrandsObject
    }

    interface ListedStandards {
        K?:SubjectsObject
    }

    let standards:object[] = []
    let filteredStandards:ListedStandards = {
        'Kindergarten': {
            'Computer Science': {
                'Algorithms & Programming': [1, 1, 1, 1]
            }
        }
    }

    let listView:any;

    let showOrClose:boolean = false
    onMount(async () => {
        const res = await (await fetch('/api/library/meta')).json()
        subjects = res.subjects as string[]
        grades = res.grades as string[]


        // const standards = await (await fetch('/api/standards')).json()
    })

    async function getStandards() {
        const standards = await (await fetch('/api/standards')).json()
    }

    function getExpanded():string {
        if(listView) {
            return listView.getStatus() == 'list'? 'Show' : 'Close'
        } else {
            return 'Show'
        }
    }
</script>

<div class='standards-list'>
    <label for='standards' class='label'>Standards</label>
        <div class='field has-addons'>
            {#if subjects}
            <ChecklistDropdown 
                title='Subjects'
                id='subjects-dropdown'
                items={subjects}
                bind:selected={selectedSubjects} 
            />
            {/if}
            {#if grades}
            <ChecklistDropdown 
                width='7rem' 
                title='Grades' 
                id='grades-dropdown' 
                items={grades} 
                bind:selected={selectedGrades} 
            />
            {/if}
            <div class='control'>
                <button class='button is-small'>Add All Selected</button>
            </div>
            <div class='control'>
                <button on:click={() => {showOrClose = listView.updateListStatus()}} class='button is-small is-info'>
                    {showOrClose? 'Close':'Search'}
                </button>
            </div>
        </div>
        <ListView bind:this={listView} contents={filteredStandards} />
</div>

<style>
    label {
        font-size: 8pt;
    }
</style>
