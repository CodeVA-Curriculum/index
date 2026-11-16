<script lang='ts'>
  import Pill from '$lib/components/Pill.svelte'
	import { enhance } from '$app/forms';
  import GroupStatsDash from '$lib/components/GroupStatsDash.svelte'
  import Fa from 'svelte-fa'
  import { page } from '$app/state'
  import { faUpload,faTrash, faPowerOff, faPencil } from '@fortawesome/free-solid-svg-icons'
  let { data } = $props()
  // TODO: add support for user roster upload
  const noReset = () => {  
    return async ({ update }) => {  
      update({ reset: false });  
    };  
  }
</script>

<div class='code-page'>
<section>
  <div class='title-wrap'>
    <h1>{data.code?.alias} Group Info</h1>
    <form method="POST" use:enhance={noReset}>
      <input type="text" name="id" value={data.code.id} >
      <input type="text" name="status" value={!data.code.active} >
      <button class={data.code.active ? 'active' : 'inactive'} formaction='/account?/power'><Fa icon={faPowerOff} />{data.code.active ? "Active" : "Inactive"}</button>
      <button disabled><Fa icon={faPencil} />Edit</button>
      <button formaction='/account?/delete'><Fa icon={faTrash} />Delete Group</button>
      <button disabled><Fa icon={faUpload} />Upload Roster</button>
    </form>
  </div>
  <p>Check Text: <code>{data.code.check}</code></p>
  <GroupStatsDash users={data.code.users} guides={data.guides}>
    <div class='guides'>
      {#each data.guides as guide}
        <article>
            <img src='/images/{guide.image}' />
            <a data-sveltekit-reset={false} href='?dashboard={guide.path.replace("/meta.md", "")}'>
                {guide.title}
            </a>
        </article>
      {/each}
    </div>
  </GroupStatsDash>
</section>
<section>
<div class='title-wrap'>
<h2>User Roster</h2>
<div>
  <Pill style='large'>{data.code.users.length}</Pill>
</div>
</div>
<table>
  <thead>
    <tr>
      <th scope='col'>User</th>
      <th scope='col'>Last Accessed</th>
      <th scope='col'>Last Page Visited</th>
    </tr>
  </thead>
  <tbody>
    {#each data.code?.users as user}
      <tr>
        <td>{user.username}</td>
        <td>{user.lastEvent ? user.lastEvent.timestamp?.toUTCString() : 'N/A'}</td>
        <td><a href={user.lastEvent?.navTo}>{user.lastEvent ? user.lastEvent.navTo : 'N/A'}</a></td>
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
    gap: 12px;
    margin-bottom: 1rem;
    div {
      display: flex;
      flex: 1 0;
      align-items: center;
    }
    h2 { margin: 0; }
    display: flex;
    flex-direction: row;
    align-items: center;
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

  // guide card links for selecting the dashboard
  .guides {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
    & > article {
      text-align: center;
      flex: 0 1;
      flex-basis: 8rem;
      display: flex;
      flex-direction: column;
      img {
        margin-bottom: 12px;
      }
      a {
        margin-top: auto;
      }
    }
  }
</style>
