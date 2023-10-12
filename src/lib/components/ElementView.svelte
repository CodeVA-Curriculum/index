<script lang='ts'>
    import type {Element} from '$lib/utils/elementTypes'
    import { onMount } from 'svelte';
    import {base} from '$app/paths'
    import DocumentHeader from "./DocumentHeader.svelte";
    import ElementCard from "./ElementCard.svelte";
    import StandardTag from './standards-list/StandardTag.svelte';
    export let data:Element
    // let standards = [0, 0, 0, 0]

    // TODO: pull from frontmatter or children
    let standards = []
    let standardsBySubject:any = {}

    onMount(async () => {
        let url = new URLSearchParams()

        standards = await (await fetch(`${base}/api/standards?format=flat`)).json()
        console.log(standards)

        // Arrange by subject area
        for(let i=0;i<standards.length;i++) {
            if(!standardsBySubject[standards[i].subject]) {
                standardsBySubject[standards[i].subject] = [standards[i]]
            } else if(!standardsBySubject[standards[i].subject].includes(standards[i].standard)) {
                standardsBySubject[standards[i].subject] = [...standardsBySubject[standards[i].subject], standards[i]]
            }
        }
        console.log("Standards By Subject:", standardsBySubject)
    })

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
            <div class='sidebar'>
                <h3>Standards</h3>
                <!-- {#each standards as obj}
                <p>
                    <i>{obj.id}:</i>
                    {#each stds as std}
                    <a href='/' class='tag std-tag mx-1 my-1'>N.XX.n</a>
                    {/each}
                </p> -->
                {#each Object.entries(standardsBySubject) as [title, stds]}
                <p>
                    <i>{title}:</i>    
                    {#each stds as obj}
                    <StandardTag standard={obj} status={true} theme='is-light' />
                    {/each}
                </p>
                {/each}
            </div>
            <div class='sidebar'>
                <h3>Tags</h3>
                {#each data.frontmatter.tags as tag}
                <a href={`${base}/library/search?tag=${tag}`} class='tag m-1'>{tag}</a>
                {/each}
            </div>
            
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
</style>