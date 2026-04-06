<script lang='ts'>
  import { Project } from '$lib/components/guide/Project.svelte'
  import ProjectListItem from '$lib/components/guide/ProjectListItem.svelte'
  import ProjectListItemSearch from '$lib/components/guide/ProjectListItemSearch.svelte'
  import {onMount} from 'svelte'
  import { Map } from '$lib/components/guide/Map.svelte'
  let { data } = $props()
  const map = new Map(data.guide)
  let results = $state([])
</script>
<div class='container'>
<section>
  <h1>Search {data.guide.pathTitle.charAt(0).toUpperCase() + data.guide.pathTitle.slice(1)} Projects</h1>
  <ProjectListItemSearch input={map.projects} bind:results={results} />
</section>
<section>
  {#each results as project}
    <ProjectListItem map obj={project} />
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
