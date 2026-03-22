<script lang='ts'>
  import NextUp from '$lib/components/guide/NextUp.svelte'
  import ProjectView from '$lib/components/guide/ProjectView.svelte'
  import NodeView from '$lib/components/guide/NodeView.svelte'
  import { Node } from '$lib/components/guide/Node.svelte'
  import { Project } from '$lib/components/guide/Project.svelte'
  import ElementTabs from '$lib/components/guide/ElementTabs.svelte'
  import DetailsIcons from '$lib/components/guide/DetailsIcons.svelte'
  import { onMount } from 'svelte'
  let { data } = $props()
  let project:Project
  const obj = data.type == "project" ? new Project(data.element) : new Node(data.element)
</script>
<div class='element'>
  {#if data.type == "project"}
  <ProjectView obj={obj} />
  {:else}
  <NodeView obj={obj} />
  {/if}
</div>

