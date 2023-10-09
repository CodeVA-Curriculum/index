<script lang='ts'>
    import {onMount} from 'svelte'
    import {slide} from 'svelte/transition'
    import { faCaretDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'
    import StandardsList from '../standards-list/StandardsList.svelte';
    import ChecklistDropdown from '../standards-list/ChecklistDropdown.svelte';
    import CheckBoxDropdown from './CheckBoxDropdown.svelte';
    import InputWithDropdown from './InputWithDropdown.svelte';

    let selectedTypes:string[] = []
    let selectedAudiences:string[] = []
    let selectedTags:string[] = []
    let selectedSubjects:string[] = []
    let selectedGrades:string[] = []
    let selectedStandards:object[] = []

    const types = [ // TODO:
        "Unit of Study",
        "Lesson Plan",
        "Curricular Resource"
    ]
    const audiences = [ // TODO:
        "Classroom Teachers",
        "Students",
        "Administrators",
        "Curriculum Writers"
    ]
    const tags = ['python', 'ecs'] // TODO:
    
    export let params:string = ""
    export let data;

    export function getParams() {
        // let tmp = ''
        // tmp += listToParams('aud', selectedAudiences)
        // tmp += listToParams('&types', selectedTypes)
        // tmp += listToParams('&tags', selectedTags)
        // for(let i=0;i<selectedStandards.length;i++) {
        //     tmp+=`&sols=${selectedStandards[i].title}`
        // }
        let sols:string[] = []
        for(let i=0;i<selectedStandards.length;i++) {
            sols = [...sols, selectedStandards[i].title]
        }

        interface Params {
            aud?:string[],
            type?:string[]
            tag?:string[]
            sol?:string[],
            subj?:string[],
            grade?:string[]
        }

        let subjectsToSend:string[] = []
        for(const subj in selectedSubjects) {
            subjectsToSend = [...subjectsToSend, ...selectedSubjects[subj]]
        }

        const tmp:Params = {}
        if(selectedAudiences.length > 0) { tmp['aud'] = selectedAudiences }
        if(selectedTypes.length > 0) { tmp['type'] = selectedTypes }
        if(selectedTags.length > 0) { tmp['tag'] = selectedTags }
        if(subjectsToSend.length > 0) {tmp['subj'] = subjectsToSend}
        if(sols.length > 0) { tmp['sol'] = sols }
    
        return tmp
    }

    function listToParams(prefix:string,list:string[]):string {
        let str = ''
        for(let i=0;i<list.length;i++) {
            str+=`${prefix}=${list[i]}`
        }
        return str
    }

    onMount(() => {
        if(data) {
            const audiences = data.get('aud')
            if(audiences) {
                selectedAudiences = audiences.split(',')
            }

            const resources = data.get('type')
            if(resources) {
                selectedTypes = resources.split(',')
            }
        }
    })
</script>

<div class='filters has-text-left columns'>
    <div class='column is-narrow'>
        <StandardsList 
            preselect={data} 
            bind:standardsObjs={selectedStandards}
            bind:selectedGrades={selectedGrades}
            bind:selectedSubjects={selectedSubjects}
        />
    </div>
    <div class='column'>    
        <div class='field is-grouped'>
            <div class='control'>
                <label class='label small'>Audiences</label>
                <CheckBoxDropdown 
                    width={'10rem'}
                    title="Select..."
                    id='resource-dropdown'
                    items={audiences}
                    bind:selected={selectedAudiences}
                />
            </div>
            <div class='control'>
                <label class='label small'>Resource Types</label>
                <CheckBoxDropdown 
                    width={'10rem'}
                    title="Select..."
                    id='resource-dropdown'
                    items={types}
                    bind:selected={selectedTypes}
                />
            </div>
            <div class='control'>
                <label class='label small'>Tags</label>
                <InputWithDropdown preselect={data ? data.get('tag') : null} bind:selected={selectedTags} tagsList={tags} title="Tags" placeholder="Type to search..." />
            </div>
        </div>
    </div>
</div>

<style>
    label {
        font-size: 8pt;
    }
    .dropdown-content > span {
        font-size: 8pt;
    }
</style>