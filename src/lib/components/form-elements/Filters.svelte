<script lang='ts'>
    import {onMount} from 'svelte'
    import {slide} from 'svelte/transition'
    import { faCaretDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'
    import StandardsList from '../standards-list/StandardsList.svelte';
</script>

<div class='filters has-text-left columns'>
    <div class='column'>
        <StandardsList />
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