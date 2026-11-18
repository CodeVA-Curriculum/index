<script lang='ts'>
  import ProjectListItem from '$lib/components/guide/ProjectListItem.svelte'
  import ProjectListItemSearch from '$lib/components/guide/ProjectListItemSearch.svelte'
  import { Node } from '$lib/components/guide/Node.svelte'
  import {onMount} from 'svelte'
  let { data } = $props()
  let nodes:Node[] = $state([])
  let results:Node[] = $state([])
  onMount(() => {
    for(const n of data.guide.nodes) {
      nodes.push(new Node(n))
    }
    results = nodes
  })

</script>
<div class='container'>
<section>
  <h1>Search {data.guide.pathTitle.charAt(0).toUpperCase() + data.guide.pathTitle.slice(1)} Tutorials</h1>
  {#if nodes.length > 0}
  <ProjectListItemSearch input={nodes} bind:results={results} filters={[
    ((o:Node) => o.db.title)
  ]} />
  {/if}
</section>
<section class='list'>
  {#each results as node}
    <div class='node'>
    <ProjectListItem map obj={node} />
    </div>
  {/each}
</section>
</div>
<style lang='scss'>
  @use "$lib/styles/layout.scss";
  .list {
    @extend .two-column-list;
  }
  .container {
    max-width: 786px;
  }
  .filters {
    background-color: white;
    color: black;
  }
</style>
