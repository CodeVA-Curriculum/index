<script lang='ts'>
    import type { Frontmatter } from "$lib/utils/frontmatter";
    import {faArrowUpRightFromSquare, faCloudArrowDown, faSpinner} from '@fortawesome/free-solid-svg-icons'
    import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons'
    import Fa from 'svelte-fa'

    export let meta:Frontmatter
    export let size:string = ''
</script>

{#if meta.links}
<div class='buttons is-left mt-5 px-0'>
    {#if meta.links.drive}
    <a class='button is-primary {size}' href='{meta.links.drive}'>
        Google Drive
        <Fa class='ml-2' icon={faGoogleDrive} />
    </a>
    {/if}
    {#if meta.links.pdf}
    <a class='button {size}' href='{meta.links.pdf}'>
        PDF
        <Fa class='ml-2' icon={faCloudArrowDown} />
    </a>
    {/if}
    {#if meta.links.goopen}
    <a class='button {size}' href='{meta.links.goopen}'>
        GoOpenVA
        <Fa class='ml-2' icon={faSpinner} />
    </a>
    {/if}
    {#if meta.links.ext}
    <a class='button {size}' href='{meta.links.ext}'>
        View {meta.members && meta.members.length > 0? 'Group' : 'Resource'}
        <Fa class='ml-2' icon={faArrowUpRightFromSquare} />
    </a>
    {/if}
    <slot />
</div>
{/if}