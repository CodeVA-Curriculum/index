<script lang='ts'>
    import Fa from 'svelte-fa'
    import {faCaretDown, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
    
    export let title:string = 'No Title'
    export let selected:string[] = []
    export let placeholder:string = "No placeholder..."

    let expanded:boolean = false

    function removeTag(index:number) {
        // TODO:
        console.log("Got call to remove tag")
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

<div class='input-with-dropdown'>
    <div use:clickOutside on:click_outside={handleClickOutside} class="dropdown {expanded?'is-active':''} long">
        <label for='tag-select' class='label is-small'>{title}: </label>
        <div class="field long has-addons" >
            <!-- <div class="field"> -->
                <p class="control is-expanded has-icons-right long is-pink" aria-haspopup="true" aria-controls="dropdown-menu">
                    <input on:click={()=>{expanded=true}} name='tag-select' class="input is-small long" type="search" placeholder={placeholder} />
                    <span class="icon is-right">
                        <Fa size='1.5x' icon={faQuestionCircle} />
                        <Fa class='ml-1 mr-3' size='1x' icon={faCaretDown} />
                    </span>
                </p>
            <!-- </div> -->
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content pl-2">
                <p class='dropdown-item'>
                    {#if selected.length == 0}
                    <p class='items-in-list is-italic has-text-centered'>— None selected —</p>
                    {/if}
                    {#each selected as tag, i}
                    <span class='tag'>
                        {tag}
                        <button on:click={() => removeTag(i)} class='delete is-small'></button>
                    </span>
                    {/each}
                </p>
                <span class='dropdown-divider'></span>
                <slot />
            </div>
        </div>    
    </div>
    <div class='selected-tags'>
        {#each selected as tag, i}
            <span class='tag'>
                {tag}
                <!-- TODO: figure out how to delete tags from parent, who sets the list format -->
                <button on:click={() => removeTag(i)} class='delete is-small'></button>
            </span>
        {/each}
    </div>
</div>

<style>
    label {
        margin-top: 5px;
        margin-right: 8px;
    }
    input {
        width: 12rem;
    }
    .selected-tags {
        margin-left: 2.5rem;
        margin-top: 5px;
    }
    .selected-tags > a {
        margin: 3px;
    }
    .items-in-list {
        font-size: small;
    }
    .is-pink {
        background-color: pink;
    }
    .long {
        width: 100%;
    }
</style>