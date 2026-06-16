<script lang='ts'>
  import { dashboardURL } from '$lib'
  let { redirect, user, session } = $props()
  const key = 'V5QLBdKt5AYPU5Y7iMcDa5lQ1PLYYq7EdxfgjCP1sWcih1TGIl8vAYOLa7-vVr69dX_MNZirOMjUojYPd_4-BQ'

  const button = testAuth;
  let showForm =$state("hidden")
</script>

{#snippet portalAuth()}
<form action="https://portal.codevirginia.org/auth/redirect?redirect_url=http://localhost:5173/login" method='POST'>
  <input style="display:none;" name="secret_key" id="secret_key" value={key}>
  <input type="submit" value="Log In">
</form>
{/snippet}

{#snippet testAuth(redirect:string)}
<div class='buttons'>
<form action="/login?/login{redirect && redirect.length > 0 ? '?redirect={redirect}' : ''} " method='POST'>
  <input style="display:none;" name="session_token" id="session_token" value={"DOESNT MATTER, TESTING"}>
  <input id="submit" type="submit" value="Log In as Educator">
</form>
  {@render codeForm()}
</div>
{/snippet}

{#snippet codeForm()}
  <button onclick={() => showForm="visible"} class={showForm}>Log In With Code</button>
  <form action="/login?/confirm" method="POST" class={showForm}>
    <fieldset role="group">
      <input type="text" id="session_token" name="session_token" value="ASDF" />
      <input class='secondary' type="submit" value="Log In" />
    </fieldset>
  </form>
{/snippet}

<div class='login'>
{#if !session}
  {@render button(redirect)}
{:else}
  <a role="button" href={dashboardURL}>{session.alias} | {user.username} </a>
{/if}
</div>
<style lang='scss'>
  form{ display: flex; }
  form.hidden {
    display: none;
  }
  button.visible {
    display: none;
  }
  button.hidden {
    display: flex;
  }
  
  .login { flex: 1 1;}
  fieldset { margin: 0; }
</style>

