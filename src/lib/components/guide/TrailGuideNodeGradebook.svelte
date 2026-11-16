<script lang='ts'>
  let { guide, users } = $props()
  import Fa from 'svelte-fa'
  import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
</script>
<div class='node-gradebook'>
  <table>
    <thead class='compact'>
      <tr>
      <th class='freeze'>User</th>
      <th class='rotate'>Last Active</th>
      {#each guide.locations as node}
        <th class='rotate'><div><a href="{node.path}">{node.title}</a></div></th>
      {/each}
      </tr>
    </thead>
    <tbody>
      {#each users as user}
        <tr>
        <td class='freeze'>{user.username}</td>
        <td class='timestamp'>{user.lastEvent ? user.lastEvent.timestamp?.toDateString().substring(0, user.lastEvent.timestamp?.toDateString().lastIndexOf(' ')) : 'N/A'}</td>
        {#each guide.locations.filter((l) => !l.path.includes('projects')) as node}
          <td class='status'>
            {#if user.completedNodes.filter((c) => c.id == node.id).length > 0}
            <Fa size='1.5x' icon={faCircleCheck} />
            {/if}
          </td>
        {/each}
        </tr>
      {/each}
    </tbody>
</div>

<style lang='scss'>
  @use "$lib/styles/theme.scss";

  td { vertical-align: middle; }
  .timestamp {
    font-size: 11pt;
    white-space: nowrap;
  }
  .status {
    
    color: rgb(72, 199, 116);
  }
  .node-gradebook {
    overflow-x: auto;
  }
  th {
    font-size: 12pt;
  }
  .freeze {
    position: sticky;
    left: 0;
  }
  tr {
    vertical-align: bottom;
  }
  th.rotate {
    min-width: 100px;
  }
  td { border: 1px solid #e7eaf0;
    text-align: center;
   }
  a {
    word-wrap: break-word;
  }
</style>

