<script lang='ts'>
    import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'
    
    export let title:string="Tags"
    export let items:string[] = ['tag', 'tag', 'tag', 'tag', 'tag', 'tag', 'tag', 'tag','tag', 'tag', 'tag', 'tag','tag', 'tag', 'tag', 'tag']
    // TODO: change this variable, which is bound in the parent to modify the URL params for the Search button
    export let param:string = ''

    let selectedTags:string[] = ['tag']
    let expanded:boolean=false

    function removeTag(index:number) {
        console.log("Removing tag")
        selectedTags = selectedTags.filter( (e,i) => i !== index );
    }
    function addTag(index:number) {
        selectedTags = [items[index], ...selectedTags]
    }

    function clickOutside(node:any) {
        const handleClick = (event: { target: any; defaultPrevented: any; }) => {
            if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('click_outside', node)
            )
            }
        }
        document.addEventListener('click', handleClick, true);
        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        }
    }
    function handleClickOutside(event: any) {
		expanded = false;
	}
</script>

<div class='tags-dropdown'>
    <div use:clickOutside on:click_outside={handleClickOutside} class="dropdown {expanded?'is-active':''}">
        <label for='tag-select' class='label is-small'>{title}: </label>
        <div class="dropdown-trigger">
            <div class="field">
                <p class="control is-expanded has-icons-right" aria-haspopup="true" aria-controls="dropdown-menu">
                    <input on:click={()=>{expanded=true}} name='tag-select' class="input is-small" type="search" placeholder="Search tags..."/>
                    <span class="icon is-small is-right"><Fa icon={faCaretDown} /></span>
                </p>
            </div>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content pl-2">
                <p class='dropdown-item'>
                    {#each selectedTags as tag, i}
                    <span class='tag'>
                        {tag}
                        <button on:click={() => removeTag(i)} class='delete is-small'></button>
                    </span>
                    {/each}
                </p>
                <span class='dropdown-divider'></span>
                {#each items as item, i}
                <a on:click={() => {addTag(i)}} class="tag m-1">{item}</a>
                {/each}
            </div>
        </div>    
    </div>
    <div class='selected-tags'>
        {#each selectedTags as tag, i}
            <span class='tag'>
                {tag}
                <button on:click={() => removeTag(i)} class='delete is-small'></button>
            </span>
        {/each}
    </div>
</div>

<style>
    label {
        width: 2.5rem;
        margin-top: 5px;
    }
    input {
        width: 12rem;
    }
    .selected-tags {
        margin-left: 2.5rem;
        width: 12rem;
        margin-top: 5px;
    }
    .selected-tags > a {
        margin: 3px;
    }
</style>

