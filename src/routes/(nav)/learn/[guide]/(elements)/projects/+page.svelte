<script lang='ts'>
  import { Project } from '$lib/components/guide/Project.svelte'
  import ProjectListItem from '$lib/components/guide/ProjectListItem.svelte'
  import {onMount} from 'svelte'
  let { data } = $props()
  const projects:Project[] = []
  data.projects.forEach((o) => {
    projects.push(new Project(o))
  })
  // onMount(() => {
  //   console.log(data)
  // })
</script>
<div class='container'>
<section>
  <h1>Search {data.guide.pathTitle.charAt(0).toUpperCase() + data.guide.pathTitle.slice(1)} Projects</h1>
  <form>
    <fieldset role="group">
      <input type="text" />
      <button class='filters'>Filters</button>
      <input type="submit" value="Search" />
    </fieldset>
  </form>
</section>
<section>
  {#each projects as project}
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
