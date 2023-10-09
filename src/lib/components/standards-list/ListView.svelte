<script lang='ts'>
    import {slide} from 'svelte/transition'
    import StandardElement from './StandardElement.svelte';
    import ListHeading from './ListHeading.svelte';
    import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa'
    import { listedStdsToStdList } from '$lib/utils/metaUtils';
    import { onMount } from 'svelte';
    import NumberPill from '../NumberPill.svelte';
    export let contents:any = {}
    const MAX_LENGTH:number = 20

    export let listStatus = 'none'
    export let selectedStandards:string[]=[]
    export let filter;

    onMount(() => {
        listStatus = 'none'
    })

    // $:console.log(listStatus)

    export function updateListStatus(status?:string):boolean {
        const length = Object.entries(contents).length
        if(status) {
            listStatus = status
            return listStatus != 'none'
        }
        if(length == 0 && listStatus != 'empty') {
            listStatus = 'empty'
            return true
        } else if(length > MAX_LENGTH && listStatus != 'error') {
            listStatus = 'error'
        } else {
            if(listStatus != 'none') {
                listStatus = 'none'
                return false
            } else {
                listStatus = 'list'
                return true
            }
        }
        return false
    }

    function updateSelected(contents) {
        const list:Standard = listedStdsToStdList(contents)
        const titles:string[] = []
        for(let i=0;i<list.length;i++) {
            titles.push(list[i].title)
        }
        selectedStandards = selectedStandards.filter(obj => list.includes(obj.title))
    }

    export function getStatus():string {
        return listStatus
    }
    export function getSelected():number {
        return selectedStandards.length
    }

    function removeStandard(obj) {
        selectedStandards = selectedStandards.filter(std => std.title != obj.title)
    }

    function addAllIn(obj) {
        if(obj.length) {
            for(let i=0;i<obj.length;i++) {
                if(!selectedStandards.some((std)=> obj[i].title == std.title)) {
                    selectedStandards = [...selectedStandards, obj[i]]
                }
            }
        } else {
            console.log("Found object")
            for(const index in obj) {
                addAllIn(obj[index])
            }
        }
    }
</script>

<div class='list-view'>
    <div class='mb-3'>
        {#each selectedStandards as std}
        <span class='tag is-dark mr-1 ml-0 my-0'>
            {std.title}
            <button on:click={()=>removeStandard(std)} class='delete is-small'></button>
        </span>
        {/each}
        {#if selectedStandards.length > 0}
        <!-- TODO: fix A11y compliance -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span on:click={()=>selectedStandards = []} class='clear tag is-light mr-1 ml-0 my-0'>
            Clear
            <button class='delete is-small'></button>
        </span>
        {/if}
    </div>
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
    {/if}
    <span class='{listStatus != 'none'? 'show':'hide'}'>
        {#each Object.entries(contents) as [grade, subjs]}
            <ListHeading on:addAll={() => addAllIn(contents[grade])} title={grade} indent={0} >
                <span slot="pill">
                    <NumberPill 
                        list={selectedStandards} 
                        cond={(obj)=> {
                            return obj.grade == grade
                        }}
                    />
                </span>
                {#each Object.entries(subjs) as [subj, strands]}
                <ListHeading on:addAll={()=> addAllIn(contents[grade][subj])} title={subj} indent={1}>
                    <span slot="pill">
                        <NumberPill 
                            list={selectedStandards} 
                            cond={(obj)=> {
                                return obj.subject == subj
                            }}
                        />
                    </span>
                    {#each Object.entries(strands) as [strand, stds]}
                        <ListHeading on:addAll={() => addAllIn(stds)} title={strand} indent={2}>
                            <span slot="pill">
                                <NumberPill 
                                    list={selectedStandards} 
                                    cond={(obj)=> {
                                        return obj.strand == strand
                                    }}
                                />
                            </span>
                            <div class='ml-2 mt-2'>
                                {#each stds as std} 
                                <StandardElement bind:selected={selectedStandards} standard={std} />
                                {/each}
                            </div>
                        </ListHeading>
                    {/each}
                </ListHeading>
                {/each}
            </ListHeading>
        {/each}
    </span>
</div>
<style>
    .clear:hover {
        cursor:pointer;
    }
    .show {
        display: block;
    }
    .hide {
        display: none;
    }
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