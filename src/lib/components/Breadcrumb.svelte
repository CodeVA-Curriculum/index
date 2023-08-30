<script lang='ts'>
    interface Page {
        link:string,
        title:string
    }
    export let nodes:Page[];
    export let here:string;
</script>
<div class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        {#each nodes as node}
        <li class={node.title == here ? 'is-active' : ''}><a href="/">{node.title}</a></li>
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