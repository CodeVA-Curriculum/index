<script lang='ts'>
  import { Project } from '$lib/components/guide/Project.svelte'
  import ProjectListItem from '$lib/components/guide/ProjectListItem.svelte'
  import ProjectListItemSearch from '$lib/components/guide/ProjectListItemSearch.svelte'
  import {onMount} from 'svelte'
  import { Map } from '$lib/components/guide/Map.svelte'
  let { data } = $props()
  const map = new Map(data.guide)
  map.projects.sort((a,b) => a.db.recommended && !b.db.recommended ? -1 : 0 )
  let results = $state([])
</script>
<div class='container'>
<section>
  <h1>Search {data.guide.pathTitle.charAt(0).toUpperCase() + data.guide.pathTitle.slice(1)} Projects</h1>
  <ProjectListItemSearch input={map.projects} bind:results={results} />
</section>
<section class='list'>
  {#each results as project}
  <div class='proj-wrap'>
    <ProjectListItem map obj={project} />
  </div>
  {/each}
</section>
</div>
<style lang='scss'>
  @use "$lib/styles/layout.scss";
  .container {
    max-width: 786px;
  }
  .list {
    @extend .two-column-list;
  }
  .filters {
    background-color: white;
    color: black;
  }
</style>
