<script lang='ts'>
  import TutorialListItem from '$lib/components/guide/TutorialListItem.svelte'
  let { data } = $props()
</script>
<div class='container'>
<section>
  <h1>Search {data.guide.pathTitle.charAt(0).toUpperCase() + data.guide.pathTitle.slice(1)} Projects</h1>
</section>
<section>
  {#each data.nodes as node}
    <TutorialListItem obj={node} />
  {/each}
</section>
</div>
