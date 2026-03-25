<script lang='ts'>
  import ProjectView from '$lib/components/guide/ProjectView.svelte'
  import NodeView from '$lib/components/guide/NodeView.svelte'
 import { onMount } from 'svelte'
  let { data } = $props()
</script>
<div class='element'>
  {#if data.type == "project"}
  <ProjectView project={data.project} map={data.map} />
  {:else}
  <NodeView obj={data.node} />
  {/if}
</div>

