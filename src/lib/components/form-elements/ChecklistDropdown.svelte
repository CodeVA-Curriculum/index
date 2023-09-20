<script lang='ts'>
    import {onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

    export let title:string = "No Title"
    export let id:string = 'no-id'
    export let items:any = {}

    let selected:any = {}

    function manageToggle(e, subject) {
        if(e.target.checked) {
            selected[subject] = [...items[subject], subject]
        } else {
            selected[subject] = []
        }
        
    }
    
</script>

<div class='checklist-dropdown control dropdown is-hoverable'>
    <div class='dropdown-trigger'>
        <button class='button is-small'>{title}<Fa class='ml-2' icon={faChevronDown} /></button>
    </div>
    <div class='dropdown-menu' id={id} role='menu'>
        <div class='dropdown-content'>
            {#each Object.entries(items) as [subject, arr]}
                <label class="checkbox dropdown-item">
                    <input
                        on:change={(e)=>{manageToggle(e, subject)}}
                        type="checkbox"
                        value={subject}
                        bind:group={selected[subject]}
                    >
                    {subject}
                </label>
                {#each arr as strand, i}
                <label class="ml-5 checkbox dropdown-item">
                    <input 
                        bind:group={selected[subject]}
                        value={strand}
                        type="checkbox"
                    >
                    {strand}
                </label>
                {/each}
            {/each}
        </div>
    </div>
</div>

<style>
    label {
        font-size: 8pt;
    }
</style>