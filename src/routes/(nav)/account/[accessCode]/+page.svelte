<script lang='ts'>
	import { enhance } from '$app/forms';
  import GroupStatsDash from '$lib/components/GroupStatsDash.svelte'
  import Fa from 'svelte-fa'
  import { faUpload,faTrash, faPowerOff, faPencil } from '@fortawesome/free-solid-svg-icons'
  let { data } = $props()
  // TODO: add support for user roster upload
</script>

<div class='code-page'>
<section>
  <div class='title-wrap'>
    <h1>{data.code?.alias} Group Settings</h1>
    <form method="POST" use:enhance>
      <input type="text" name="id" value={data.code.id} >
      <input type="text" name="status" value={!data.code.active} >
      <button class={data.code.active ? 'active' : 'inactive'} formaction='/account?/power'><Fa icon={faPowerOff} />{data.code.active ? "Active" : "Inactive"}</button>
      <button disabled><Fa icon={faPencil} />Edit</button>
      <button formaction='/account?/delete'><Fa icon={faTrash} />Delete Group</button>
      <button disabled><Fa icon={faUpload} />Upload Roster</button>
    </form>
  </div>
<p>Check Text: <code>{data.code.check}</code></p>
<GroupStatsDash />
</section>
<section>
<div class='title-wrap'>
<h2>User Roster <span class='title-pill'>{data.code.users.length}/10</span></h2>

</div>
<table>
  <thead>
    <tr>
      <th scope='col'>User Alias</th>
      <th scope='col'>Last Accessed</th>
      <th scope='col'>Complete/Viewed</th>
      <th scope='col'>Last Seen</th>
    </tr>
  </thead>
  <tbody>
    {#each data.code?.users as user}
      <tr>
        <td><a href="/account/{data.code?.alias}/{user?.username}">{user.username}</a></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    {/each}
  </tbody>
</table>
</section>
</div>
<style lang='scss'>
  @use "$lib/styles/theme.scss";
  .code-page { min-height: 100vh; }
  .title-wrap {
    display: flex;
    flex-direction: row;
    & > h1 { flex: 1; }
    & > form { display: flex; flex-direction: row; gap: 12px;}
    & > form > button { height: 2.5rem; font-size: 12pt; padding: 0.5rem 0.5rem; flex: 0 1; white-space: nowrap; background-color: white; color: theme.$text; border-color: theme.$text;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }
    & > form > button.active { background-color: theme.$highlight-green; color: white; border-color: transparent; }
    & > form > button.inactive { background-color: theme.$orange; }
    & > form > input { display: none;}    
  }
</style>
