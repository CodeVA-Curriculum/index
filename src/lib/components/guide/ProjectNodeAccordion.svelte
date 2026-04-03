<script lang='ts'>
  import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  let { project } = $props()
  const { nodes, groups } = project.getGroupNodeCount()
</script>
<details>
  <summary>
    <Fa icon={faLocationDot}/>
    <span>Browse {nodes} tutorials across {groups} group(s)</span>
  </summary>
  {#each project.nodeGroups as group}
  <div class='group'>
    {#if project.nodeGroups.length > 1}
    <p>{group.title.substring(1)}</p>
    {/if}
    <ol>
      {#each group.nodes as node}
      <li><a href="?view={node.db.path}">{node.db.title}</a></li>
      {/each}
    </ol>
  </div>
  {/each}
</details>
<style lang='scss'>

details {
    padding: 1rem;
    & > * { margin-bottom: 2rem; }
  }
</style>
