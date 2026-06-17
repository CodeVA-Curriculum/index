<script lang='ts'>
  import { Node } from '$lib/components/guide/Node.svelte'
  import ProjectView from '$lib/components/guide/ProjectView.svelte'
  import NodeView from '$lib/components/guide/NodeView.svelte'
 import { onMount } from 'svelte'
 import * as components from '$lib/components/guide/directives' // This is what enables custom elements in tutorial bodies
  let { data } = $props()
  let nodeObj:Node = data.node ? new Node(data.node) : null

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

