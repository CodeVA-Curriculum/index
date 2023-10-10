<script lang='ts'>
    import {slide} from 'svelte/transition'
    import StandardElement from './StandardElement.svelte';
    import ListHeading from './ListHeading.svelte';
    import { listedStdsToStdList, type ListedStandards } from '$lib/utils/metaUtils';
    import type {Standard} from '$lib/utils/metaUtils'
    import NumberPill from '../NumberPill.svelte';
    import StandardTag from './StandardTag.svelte';
    
    export let standards:any
    export let filter:any
    export let start:string[] = []
    const MAX_LENGTH:number = 20

    let contents = {}

    export let listStatus = 'none'
    export let selectedStandards:object[]=[]

    function findStandardbyId(id:string, contents:(ListedStandards|object[])):any {
        if(contents && contents.length) {
            const obj = (contents as object[]).filter((e) => {
                return (e as Standard).id == id
            })
            return obj[0]
        } else if(contents){
            contents as ListedStandards
            for(const [k, v] of Object.entries(contents)) {
                const obj = findStandardbyId(id, v as ListedStandards)
                if(obj) { return obj }
            }
        }
        return null
    }

    function standardIsHere(id:string, contents:(ListedStandards|object[])):boolean {
        const obj = findStandardbyId(id, contents)
        if(obj) { return true }
        return false
    }

    let loaded = false
    $: if(start && standards && !loaded) {
        for(let i=0;i<start.length;i++) {
            const obj = findStandardbyId(start[i], standards)
            if(!selectedStandards.some((e) => {
                return (e as Standard).id == obj.id
                // return false
            })) {
                selectedStandards = [...selectedStandards, obj]
            }
        }
        loaded = true
        contents = standards
    // } else if(loaded) {
    //     console.log('update')
    //     contents = standards // update from filter
    }

    export function updateListStatus(status?:string):boolean {
        const length = Object.entries(contents).length
        if(status) {
            listStatus = status
            return listStatus != 'none'
        }
        if(length == 0 && listStatus != 'empty') {
            listStatus = 'none'
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

    function updateSelected(contents:ListedStandards) {
        const list:Standard[] = listedStdsToStdList(contents)
        const ids:string[] = []
        for(let i=0;i<list.length;i++) {
            ids.push(list[i].id)
        }
        selectedStandards = selectedStandards.filter(obj => list.includes(obj.id))
    }

    export function getStatus():string {
        return listStatus
    }
    export function getSelected():number {
        return selectedStandards.length
    }

    function removeStandard(obj:Standard) {
        selectedStandards = selectedStandards.filter((std) => {
            const standard = std as Standard
            return standard.id != obj.id
        })
    }

    // TODO: make overloaded version
    function addAllIn(obj:(ListedStandards|object[])) {
        if(obj.length) {
            const list = obj as Standard[]
            for(let i=0;i<list.length;i++) {
                if(!selectedStandards.some((std)=> {
                    const standard = std as Standard
                    return list[i].id == standard.id
                })) {
                    selectedStandards = [...selectedStandards, list[i]]
                }
            }
        } else {
            for(const [k,v] of Object.entries(obj)) {
                const object = v as ListedStandards
                addAllIn(object)
            }
        }
    }

    // TODO: make overloaded version
    function findStandardsCount(obj:any) {
        if(obj.length) {
            return obj.length
        } else {
            let count = 0
            for(const index in obj) {
                count += findStandardsCount(obj)
            }
            return count
        }
    }
    $: console.log(standardIsHere('K.MT.PS.1', filter))
</script>

<div class='list-view'>
    <div class='mb-3'>
        {#each selectedStandards as std}
        <StandardTag on:delete={(e)=>removeStandard(e.detail.data)} standard={std} status={standardIsHere(std.id, filter)} />
        {/each}
        {#if selectedStandards.length > 0}
        <!-- TODO: fix A11y compliance -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span on:click={()=>selectedStandards = []} class='clear tag is-light mr-1 ml-0 my-0 mt-1'>
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
        <!-- TODO: replace object entries with API endpoints -->
        <div class='has-text-centered {Object.entries(contents).length == 0? 'show':'hide'}'>
            <p class='is-italic small'>--- None selected. Use dropdowns. ---</p>
        </div>
        {#each Object.entries(filter) as [grade, subjs]}
            <ListHeading on:addAll={() => addAllIn(filter[grade])} title={grade} indent={0}>
                <span slot="pill">
                    <NumberPill 
                        list={selectedStandards} 
                        cond={(obj)=> {
                            return obj.grade == grade
                        }}
                    />
                </span>
                {#each Object.entries(subjs) as [subj, strands]}
                <ListHeading on:addAll={()=> addAllIn(filter[grade][subj])} title={subj} indent={1}>
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
                            <div class='ml-2 my-2'>
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
    .list-view {
        width: 25rem;
    }
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