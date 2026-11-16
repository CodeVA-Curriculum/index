<script lang='ts'>
  let { guide, users } = $props()
</script>
<div class='project-gradebook'>
  <table>
    <thead>
      <tr>
      <th>User</th>
      <th>Last Active</th>
      {#each guide.projects as project}
        <th><a href="{project.path}">{project.title}</a></th>
      {/each}
      </tr>
    </thead>
    <tbody>
      {#each users as user}
        <tr>
        <td>{user.username}</td>
        <td class='timestamp'>{user.lastEvent ? user.lastEvent.timestamp?.toDateString().substring(0, user.lastEvent.timestamp?.toDateString().lastIndexOf(' ')) : 'N/A'}</td>
        {#each guide.projects as project}
          <td>{user.projectPercents[project.path] == 0 ? "" : user.projectPercents[project.path] + "%"}</td>
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
  .project-gradebook {
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
