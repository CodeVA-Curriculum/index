<script lang='ts'>
    import Breadcrumb from "./Breadcrumb.svelte";
    import {base} from '$app/paths'
    import Fa from 'svelte-fa'
    import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons'
    import {faCloudArrowDown} from '@fortawesome/free-solid-svg-icons'
    import { srcToUrl } from "$lib/utils/pathUtils";

    import type {Frontmatter} from '$lib/utils/frontmatter'
    import ArrayAsInlineList from "../ArrayAsInlineList.svelte";
    import { onMount } from "svelte";

    export let meta:Frontmatter;

    // onMount(() => {
    //     console.log(meta)
    // })
</script>

<div class='document-header content'>
    <Breadcrumb nodes={[meta, ...meta.parents]} here={meta.title} />
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
            {#if meta.parents.length > 0}
            <p>Part of the 
                {#each meta.parents as parent, i}
                {#if i>1},{/if}
                {#if i==meta.parents.length-1 && meta.parents.length>1}and{/if}
                <a data-sveltekit-reload href="{srcToUrl(parent.pathData.path).replace('meta', '')}"><i>{parent.title}</i></a>
                {/each}
                project{meta.parents.length>1 ? 's' : ''}.</p>
            {/if}
            <div class='metadata'>
                <ArrayAsInlineList title="Subject" items={meta.subjects} />
                <ArrayAsInlineList title="Grade" items={meta.grades} />
                <ArrayAsInlineList title="Material Type" items={meta.types} />
                <!-- <p><strong>Material Type: </strong>Lesson Plan, Unit of Study</p> -->
                <p style='font-size: smaller; margin: 0 auto;'><strong>License: </strong><a href={meta.license.link}>{meta.license.name}</a></p>
            </div>
            <div class='buttons is-left my-5'>
                <a class='button is-primary' href='{meta.links.drive}'>
                    View {meta.members.length > 0? 'Group' : ''} on Google Drive
                    <Fa class='ml-2' icon={faGoogleDrive} />
                </a>
                {#if meta.links.pdf}
                <a class='button' href='{meta.links.pdf}'>
                    Download {meta.members.length > 0? 'Group' : ''} PDF
                    <Fa class='ml-2' icon={faCloudArrowDown} />
                </a>
                {/if}
            </div>
        </div>
    </div>

</div>

<style>
    .metadata {
        margin-top: 1rem;
    }
</style>