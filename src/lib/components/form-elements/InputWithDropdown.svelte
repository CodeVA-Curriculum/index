<script lang='ts'>
    import Fa from 'svelte-fa'
    import {faCaretDown, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
    import { onMount } from 'svelte';
    
    export let selected:string[] = []
    export let placeholder:string = "No placeholder..."
    export let tagsList = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8']
    export let id:string;

    let query:string = ''
    let filteredTags:string[] = []

    let input;

    $: filteredTags = tagsList.filter((el) => {
        return !selected.includes(el) && (el.includes(query) || query.length == 0)
    })

    let expanded:boolean = false

    function removeTag(index:number) {
        console.log("removed", selected.slice(1, selected.length))
        selected = [...selected.slice(0, index), ...selected.slice(index+1, selected.length)]
    }

    function addTag(tag:string) {
        selected = [...selected, tag]
        query = ''
        input.focus()
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

<div class='input-dropdown'>
    <div use:clickOutside on:click_outside={handleClickOutside} class="dropdown {expanded?'is-active':''} long">
        <!-- <label for='tag-select' class='label is-small'>{title}: </label> -->
        <div class="field long has-addons" >
            <p class="control is-expanded has-icons-right long is-pink" aria-haspopup="true" aria-controls="dropdown-menu">
                <input bind:this={input} bind:value={query} on:click={()=>{expanded=true}} name='{id}' class="input is-small long" type="search" placeholder={placeholder} />
                <span class="icon is-right">
                    <Fa size='1.5x' icon={faQuestionCircle} />
                    <Fa class='ml-1 mr-3' size='1x' icon={faCaretDown} />
                </span>
            </p>
        </div>
        <div class="dropdown-menu p-0" id="dropdown-menu" role="menu">
            <div class="dropdown-content p-1 pb-2">
                <p class='dropdown-item m-0 p-0'>
                    {#if selected.length == 0}
                    <p class='items-in-list is-italic has-text-centered mt-1'>— None selected —</p>
                    {/if}
                    {#each selected as tag, i}
                    <span class='tag is-dark is-small mr-1 ml-0 my-0 mt-1'>
                        {tag}
                        <button on:click={() => removeTag(i)} class='delete is-small'></button>
                    </span>
                    {/each}
                </p>
                <span class='dropdown-divider'></span>
                {#each filteredTags as tag}
                <button on:click={() => addTag(tag)} class='tag is-dark is-small mr-1 ml-0 my-0 mt-1'>
                    {tag}
                    <!-- <button on:click={() => addTag(i)} class='is-small'></button> -->
                </button>
                {/each}
            </div>
        </div>    
    </div>
    <!-- {#if !expanded} -->
    <div class='selected-tags mb-3 mt-0'>
        {#each selected as tag, i}
            <span class='tag is-dark is-small mr-1 ml-0 my-0 mt-1'>
                {tag}
                <!-- TODO: figure out how to delete tags from parent, who sets the list format -->
                <button on:click={() => removeTag(i)} class='delete is-small'></button>
            </span>
        {/each}
        {#if selected.length > 0}
        <!-- TODO: fix A11y compliance -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span on:click={()=>selected = []} class='clear tag is-light mr-1 ml-0 my-0 mt-1'>
            Clear
            <button class='delete is-small'></button>
        </span>
        {/if}
    </div>
    <!-- {/if} -->
</div>

<style>
    button.tag {
     border-width: 0;
    }
    .dropdown-content {
        position: relative;
        top: -0.5rem;
    }
    .input-dropdown {
        width: 12.5rem;
    }
    label {
        margin-top: 5px;
        margin-right: 8px;
    }
    input {
        width: 12rem;
    }
    .items-in-list {
        font-size: 9pt;
    }
    /* .is-pink {
        background-color: pink;
    } */
    .long {
        width: 100%;    
    }
</style>