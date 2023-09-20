<script lang='ts'>
    import {onMount} from 'svelte'
    import { faCaretDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'
    import Dropdown from "./Dropdown.svelte";
    import MultipleSelect from "./MultipleSelect.svelte";
    import TagsDropdown from "./TagsDropdown.svelte"
    import ChecklistDropdown from "./ChecklistDropdown.svelte";


    let subjects:object|false = false
    onMount(async () => {
        const res = await (await fetch('/api/library/meta')).json()
        subjects = res.subjects as string[]
    })
</script>

<div class='filters has-text-left columns'>
    <div class='column'>
        <label for='standards' class='label'>Standards</label>
        <div class='field has-addons'>

            <!-- TODO: Add endpoint -->
            {#if subjects}
            <ChecklistDropdown title='Subjects' id='subjects-dropdown' items={subjects} />
            {/if}
            <ChecklistDropdown title='Grades' id='grades-dropdown' />
            <div class='control'>
                <input name='standards' class='input is-small' placeholder="Search...">
            </div>
            <div class='control'>
                <button class='button is-small is-info'>Get List</button>
            </div>
        </div>
    </div>
    <div class='column is-narrow'>    
    <div class='field is-grouped'>
        <div class="control">
            <label class='label small'>Audiences</label>
            <div class="select is-small">
              <select >
                <option>All Audiences</option>
                <option>With options</option>
              </select>
            </div>
        </div>
        <div class="control">
            <label class='label small'>Resource Type</label>
            <div class="dropdown is-hoverable is-small">
              <div class='dropdown-trigger'>
                <button class='button is-small'>Select types...<Fa class='ml-2' icon={faChevronDown} /></button>
              </div>
              <div class='dropdown-menu'>
                <div class='dropdown-content'>
                    <span class='dropdown-item'>Lesson Plan</span>
                    <span class='dropdown-item'>Unit of Study</span>
                    <span class='dropdown-item'>Curricular Planning</span>
                </div>
              </div>
            </div>
        </div>
        <div class='control'>
            <label class='label'>Tags</label>
            <input class='input is-small' placeholder="Search for tags...">
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