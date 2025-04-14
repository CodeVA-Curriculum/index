<script lang='ts'>
    import type {Element} from '$lib/utils/elementTypes'
    import { onMount } from 'svelte';
    import {base} from '$app/paths'
    import DocumentHeader from "./DocumentHeader.svelte";
    import ElementCard from "./ElementCard.svelte";
    import StandardTag from '../standards-list/StandardTag.svelte';
    import StandardsBox from './StandardsBox.svelte';
    import SupporterPop from './SupporterPop.svelte';
    export let data:Element

    let standardsBySubject:any = {}
    
    let acknowledged = false;
    let open = true;

    function close() {
        if(acknowledged) { open = false; }
    }

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

<div class=''>
    <DocumentHeader meta={data.frontmatter} />
    <hr>
    <div class='columns'>
        <div class='column is-two-thirds'>
            <div class='content padding'>
                {@html data.content}
            </div>
        </div>
        <div class='column ml-3'>
            {#if data.frontmatter.standards}
                <StandardsBox standards={data.frontmatter.standards} />
            {/if}
            {#if data.frontmatter.tags}
            <div class='sidebar'>
                <h3 class='title is-4'>Tags</h3>
                {#each data.frontmatter.tags as tag}
                <!-- <a href={`${base}/library/search?tag=${tag}`} class='tag m-1'>{tag}</a> -->
                <span class='tag is-light m-1'>{tag}</span>
                {/each}
            </div>
            {/if}
        </div>
    </div>
    <div class='padding'>
        <h2 class='title is-3'>Materials, Resources, & Lessons</h2>
        {#each data.frontmatter.members as member}
            <ElementCard data={member} />
        {/each}
        {#if !data.frontmatter.members || data.frontmatter.members.length == 0}
        <p class='block is-italic'>None listed.</p>
        {/if}
    </div>
</div>

<!-- <SupporterPop /> -->

<!-- {#if !data.frontmatter.vdoe}
<div class="modal {open ? 'is-active' : ''}">
    <div class="modal-background blur"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Non-VDOE Material Ahead!</p>
      </header>
      <section class="modal-card-body">
        <div class='message is-danger'>
            <p class='message-body'>This resource was not created in partnership with the VDOE, and was not paid for by state-appropriated funds. These materials do not represent the views of the Virginia Department of Education, and may not align to state or federal curriculum guidelines.</p>
        </div>

        <p>To access this resource, please check the box below and click "Continue":</p>
        <div class='field mt-5'>
            <div class='control is-expanded'>
                <label class="checkbox">
                    <input bind:value={acknowledged} type="checkbox">
                    I acknowledge that the materials on this page do not reflect the views, policies, values, or constitute official guidance from the VDOE.
                </label>
            </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        
        <div class='field'>
            <div class='control'>
                <button on:click={close} class='button is-primary' disabled={!acknowledged}>Continue</button>
            </div>
        </div>
      </footer>
    </div>
</div>
{/if} -->

<style lang='scss'>
    @import '$lib/styles/colors.scss';
    .sidebar {
        margin-bottom: 3rem;
        background-color: $light-green;
        padding: 1rem 1rem;
    }
    .padding {
        margin-bottom: 5rem;
    }
</style>