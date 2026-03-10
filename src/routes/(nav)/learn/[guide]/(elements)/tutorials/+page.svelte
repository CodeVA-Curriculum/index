<script lang='ts'>
  import TutorialListItem from '$lib/components/guide/TutorialListItem.svelte'
  import ProjectListItem from '$lib/components/guide/ProjectListItem.svelte'
  let { data } = $props()
</script>
<div class='container'>
<section>
  <h1>Search {data.guide.pathTitle.charAt(0).toUpperCase() + data.guide.pathTitle.slice(1)} Tutorials</h1>
  <form>
    <fieldset role="group">
      <input type="text" />
      <button class='filters'>Filters</button>
      <input type="submit" value="Search" />
    </fieldset>
  </form>
</section>
<section>
  {#each data.nodes as node}
    <ProjectListItem map obj={node} />
  {/each}
</section>
</div>
<style lang='scss'>
  .container {
    max-width: 786px;
  }
  .filters {
    background-color: white;
    color: black;
  }
</style>
