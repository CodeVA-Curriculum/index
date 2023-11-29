<script lang='ts'>
    import {base} from '$app/paths'
    import type { Frontmatter } from '$lib/utils/frontmatter';
    import { faHome } from '@fortawesome/free-solid-svg-icons';
    import {srcToUrl} from '$lib/utils/pathUtils'
    import Fa from 'svelte-fa'
    interface Page {
        path:string,
        title:string
    }
    export let nodes:Frontmatter[];
    export let here:string;
</script>
<div class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        <li><a href="{base}/library"><Fa class='mt-1' icon={faHome} /></a></li>
        {#each [...nodes].reverse() as node}
        <li class={node.title == here ? 'is-active' : ''}><a data-sveltekit-reload href="{srcToUrl(node.pathData.path).replace('/meta', '')}">{node.title}</a></li>
        {/each}
    </ul>
</div>

<style>
    ul {
        margin: auto 0;
    }
    li + li {
        margin-top: 0rem;
    }
</style>