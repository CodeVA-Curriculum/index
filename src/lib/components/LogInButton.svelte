<script lang='ts'>
  import { dashboardURL } from '$lib'
  import { page } from '$app/state'
  let { redirect, user, session } = $props()
  const key = 'V5QLBdKt5AYPU5Y7iMcDa5lQ1PLYYq7EdxfgjCP1sWcih1TGIl8vAYOLa7-vVr69dX_MNZirOMjUojYPd_4-BQ'

  const redirectURL = page.url.origin+ '/account?/portalLogin'
  const button = portalAuth;
  let showForm =$state("hidden")
</script>

{#snippet portalAuth()}
<form action="https://portal.codevirginia.org/auth/redirect?redirect_url={redirectURL}" method='POST'>
  <input style="display:none;" name="secret_key" id="secret_key" value={key}>
  <input type="submit" value="Log In as Educator">
</form>
{/snippet}

{#snippet testAuth(redirect:string)}
<div class='buttons'>
<form action="/account?/login{redirect && redirect.length > 0 ? `?redirect=${redirect}` : ''} " method='POST'>
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
  <div>
  {@render button(redirect)}
  </div>
  <div>
  {@render codeForm()}
  </div>
{:else}
  <div>
  <a role="button" href={dashboardURL}>{user.username? user.username : session.alias } </a>
  </div>
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
  
  .login { 
    flex: 1;
    display: flex;
    gap: 8px;
    & > * {
      flex: 1;
    }
    & * {
      text-wrap: nowrap;
    }
  }
  fieldset { margin: 0; }
</style>

