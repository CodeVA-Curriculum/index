<script lang='ts'>
    import {base} from '$app/paths'
    interface Page {
        path:string,
        title:string
    }
    export let nodes:Page[];
    export let here:string;
</script>
<div class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        <li><a href="{base}/lessons">Home</a></li>
        {#each nodes as node}
        <li class={node.title == here ? 'is-active' : ''}><a href="{base}/lessons/{node.path}">{node.title}</a></li>
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