<script lang='ts'>
  import GroupStatsDash from '$lib/components/GroupStatsDash.svelte'
  let { data } = $props()
  console.log(data)
</script>
<div class='user-page'>
  <section>
    <div class='title-wrap'>
    <h1><code>{data.res?.username}</code> User Statistics</h1>
      <div>
        <button disabled>Export Report</button>
        <button disabled>Delete User</button>
      </div>
    </div>
    <GroupStatsDash />
  </section>
  <section>
    <div class='title-wrap'>
    <h2>User Access Log</h2>
      <div>
        <button disabled>Export Log</button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th scope='col'>Timestamp</th>
          <th scope='col'>Source URL</th>
          <th scope='col'>Destination URL</th>
        </tr>
      </thead>
      <tbody>
        {#each data.res.events as a}
          <tr>
            <td>{a.timestamp.toUTCString()}</td>
            <td><a href={a.navTo}>{a.navTo}</a></td>
            <td><a href={a.navFrom}>{a.navFrom}</a></td>
          </tr>
        {/each}
      </tbody>
  </section>
</div>
<style lang='ts'>
  .user-page {
    min-height: 100vh;
  }
  .title-wrap {
    display: flex;
    flex-direction: row;
    & > h1, & > h2 { flex: 1 0; }
  }
</style>
