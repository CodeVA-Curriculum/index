<script lang='ts'>
    import type {Element} from '$lib/utils/elementTypes'
    import { onMount } from 'svelte';
    import {base} from '$app/paths'
    import DocumentHeader from "./DocumentHeader.svelte";
    import ElementCard from "./ElementCard.svelte";
    import StandardTag from './standards-list/StandardTag.svelte';
    export let data:Element

    let standardsBySubject:any = {}

    onMount(async () => {
        let url = new URLSearchParams()

        // Arrange by subject area
        const standards = data.frontmatter.standards ? data.frontmatter.standards : []
        for(let i=0;i<standards.length;i++) {
            if(!standardsBySubject[standards[i].subject]) {
                standardsBySubject[standards[i].subject] = [standards[i]]
            } else if(!standardsBySubject[standards[i].subject].includes(standards[i].standard)) {
                standardsBySubject[standards[i].subject] = [...standardsBySubject[standards[i].subject], standards[i]]
            }
        }
        // console.log("Standards By Subject:", standardsBySubject)
    })

    let active = false
    // let tags = ['tag', 'tag','tag', 'tag', 'tag']
</script>

<div class='content'>
    <DocumentHeader meta={data.frontmatter} />
    <hr>
    <div class='columns'>
        <div class='column is-two-thirds'>
            {@html data.content}
            
            {#each data.frontmatter.members as member}
                <ElementCard data={member} />
            {/each}
        </div>
        <div class='column ml-3'>
            {#if data.frontmatter.standards}
            <!-- TODO: Make this its own component -->
            <div id='standards-box' class='sidebar standards'>
                <h3>Standards</h3>
                <div class='pills {active? 'full':'full'}'>
                {#each Object.entries(standardsBySubject) as [title, stds]}
                <p>
                    {#if Object.entries(standardsBySubject).length > 1}<i>{title}:</i>{/if}    
                    {#each stds as obj}
                    <StandardTag standard={obj} status={true} theme='is-light' />
                    {/each}
                </p>
                {/each}
                </div>
                <!-- <button tabindex="0" aria-expanded={active} aria-controls='standards-box' on:click={()=>{ active = !active }}>See {active? 'Less':'More'}</button> -->
            </div>
            {/if}
            {#if data.frontmatter.tags}
            <div class='sidebar'>
                <h3>Tags</h3>
                {#each data.frontmatter.tags as tag}
                <a href={`${base}/library/search?tag=${tag}`} class='tag m-1'>{tag}</a>
                {/each}
            </div>
            {/if}
        </div>
    </div>
</div>

<style lang='scss'>
    @import '$lib/styles/colors.scss';
    .sidebar {
        margin-bottom: 3rem;
        background-color: $light-green;
        padding: 1rem 1rem;
    }
    .standards > button {
        border: none;
        background-color: transparent;
        float: right;
        font-style: italic;
        &:hover {
            color: #0070E0;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .standards {
        padding-bottom: 1.75rem;
    }
    .pills {
        &.full {
            max-height: auto;
            overflow-y: auto;
        }
        &.collapsed {
            max-height: 2.5rem;
            overflow-y: hidden;
        }
    }
</style>