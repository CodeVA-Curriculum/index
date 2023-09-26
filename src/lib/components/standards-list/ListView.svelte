<script lang='ts'>
    import {slide} from 'svelte/transition'
    import StandardElement from './StandardElement.svelte';
    import ListHeading from './ListHeading.svelte';
    import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa'
    export let contents:any = {}
    const MAX_LENGTH:number = 20

    export let listStatus = 'none'

    export function updateListStatus(status?:string):boolean {
        if(status) {
            listStatus = status
            return true
        }
        if(contents.length == 0) {
            listStatus = 'empty'
        } else if(contents.length > MAX_LENGTH) {
            listStatus = 'error'
        } else {
            if(listStatus == 'list') {
                listStatus = 'none'
            } else {
                listStatus = 'list'
                return true
            }
        }
        return false
    }

    export function getStatus():string {
        return listStatus
    }
</script>

<div class='list-view'>
    {#if listStatus == 'empty'}
        <div class='has-text-centered'>
            <p class='is-italic small'>--- None selected. Use dropdowns. ---</p>
        </div>
    {:else if listStatus == 'error'}
        <div transition:slide class='message is-danger is-small'>
            <div class='message-header'>
                Too Many Standards!
                <button on:click={() => {updateListStatus('list')}} class='delete'></button>
            </div>
            <div class='message-body content'>
                <p>Use the <i>Subjects</i> and <i>Grades</i> dropdowns to filter the list.</p>
            </div>
        </div>
    {:else if listStatus != 'none'}
        {#each Object.entries(contents) as [grade, subjs]}
            <ListHeading title={grade} >
                {#each Object.entries(subjs) as [subj, strands]}
                <ListHeading title={subj} indent={1}>
                    {#each Object.entries(strands) as [strand, stds]}
                        <ListHeading title={strand} indent={2}>
                            {#each stds as std} 
                            <StandardElement />
                            {/each}
                        </ListHeading>
                    {/each}
                </ListHeading>
                {/each}
            </ListHeading>
        {/each}
    {/if}
</div>
<style>
    button {
        height: 1.5rem;
        margin-right: 0;
    }
    button:hover {
        background-color: whitesmoke;
    }
    .small {
        font-size: small;
    }
</style>