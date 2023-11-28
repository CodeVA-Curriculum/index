<script lang='ts'>
    import Breadcrumb from "./Breadcrumb.svelte";
    import {base} from '$app/paths'
    import Fa from 'svelte-fa'
    import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons'
    import {faCloudArrowDown, faSpinner} from '@fortawesome/free-solid-svg-icons'
    import { srcToUrl } from "$lib/utils/pathUtils";

    import type {Frontmatter} from '$lib/utils/frontmatter'
    import ArrayAsInlineList from "../ArrayAsInlineList.svelte";
    import { onMount } from "svelte";
    import ElementButtons from "./ElementButtons.svelte";

    export let meta:Frontmatter;
    let visibleParents:Frontmatter[] = []

    onMount(() => {
        for(let i=0;i<meta.parents.length;i++) {
            if(!meta.parents[i].pathData.path.includes('.meta')) {
                visibleParents = [...visibleParents, meta.parents[i]]
            }
        }
    })
</script>

<div class='document-header content'>
    <Breadcrumb nodes={[meta, ...visibleParents]} here={meta.title} />
    <div class='columns'>
        <div class='column is-one-quarter'>
            <img 
                alt="A logo for the {meta.title} resource from CodeVA"
                src="/images/{meta.image}"
            >
        </div>
        <div class='column ml-5'>
            <h1>{meta.title}</h1>
            <p class='heading'>by {meta.authors}</p>
            {#if visibleParents.length > 0}
            <p>Part of the 
                {#each visibleParents as parent, i}
                    {#if i>1},{/if}
                    {#if i==visibleParents.length-1 && visibleParents.length>1}and{/if}
                    <a data-sveltekit-reload href="{srcToUrl(parent.pathData.path).replace('meta', '')}"><i>{parent.title}</i></a>
                {/each}
                project{visibleParents.length>1 ? 's' : ''}.</p>
            {/if}
            <div class='metadata'>
                <ArrayAsInlineList title="Subject" items={meta.subjects} />
                <ArrayAsInlineList title="Grade" items={meta.grades} />
                <ArrayAsInlineList title="Material Type" items={meta.types} />
                <!-- <p><strong>Material Type: </strong>Lesson Plan, Unit of Study</p> -->
                <p style='font-size: smaller; margin: 0 auto;'><strong>License: </strong><a href={meta.license.link}>{meta.license.name}</a></p>
            </div>
            <ElementButtons meta={meta} />
        </div>
    </div>

</div>

<style>
    .metadata {
        margin-top: 1rem;
    }
</style>