<script lang='ts'>
  import ProjectListItem from '$lib/components/guide/ProjectListItem.svelte'
  import {onMount} from 'svelte'
  let { data } = $props()
  // onMount(() => {
  //   console.log(data)
  // })
</script>
<section>
  <h1>Search {data.guide.pathTitle.charAt(0).toUpperCase() + data.guide.pathTitle.slice(1)} Projects</h1>
</section>
<section>
  {#each data.projects as project}
    <ProjectListItem obj={project} />
  {/each}
</section>
