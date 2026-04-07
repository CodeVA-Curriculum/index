<script lang='ts'>
  import { Node } from '$lib/components/guide/Node.svelte'
  import ProjectView from '$lib/components/guide/ProjectView.svelte'
  import NodeView from '$lib/components/guide/NodeView.svelte'
 import { onMount } from 'svelte'
  let { data } = $props()
  let nodeObj:Node = new Node(data.node)

</script>
<div class='element'>
  {#if data.type == "project"}
  <ProjectView project={data.project} map={data.map} />
  {:else}
  <div class='container'>
    <NodeView obj={nodeObj} />
  </div>
  {/if}
</div>

