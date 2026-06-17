<script lang='ts'>
	import { enhance } from '$app/forms';
  import Fa from 'svelte-fa'
  import { faTrash, faRefresh, faPowerOff } from'@fortawesome/free-solid-svg-icons'
  import { dashboardURL } from '$lib'
  let { data, form } = $props()
  let value = $state(generate())
  let accountOwner = data.user.id == data.accessCode.owner
  console.log(accountOwner)
  function generate() {
    const a = "ABCDEFGHOJKLMNOPQRSTUVWXYZ1234567890"
    let code = ""
    while(code.length < 4 ) {
      code += a.charAt(Math.floor(Math.random() * a.length))
      if(code.length == 4 && data.session.alias == code) {
        code = ""
      }
    }
    return code
  }
</script>
<div class='account'>
{#if data.user && data.session}
<aside>
  <nav>
    <p>Settings</p>
    <hr>
    <ul>
      <li><a href={dashboardURL} target="_blank">Homepage</a></li>
      {#if accountOwner}
      <li><a href="/account/library">Manage Access Codes</a></li>
      {/if}
      <li>
        <form method="POST" action='?/logout'>
          <button>Sign Out</button>
        </form>
      </li>
    </ul>
  </nav>
</aside>
{/if}
<div class='container'>

  {#if !data.session}
  <section>
    <LoginDialogue session= {data.session}/>
  </section>
  {:else}
  <section>
  <h1>Hello, { data.user.username}!</h1>
  {#if data.user.id != data.accessCode.owner}
  <p>You are logged in with under access code {data.accessCode.alias}.</p>
  {/if}
  </section>
{#if accountOwner}
  <section>
  <h2 id="library">Access Codes</h2>
  <div class='create-code'>
    <p>Create a new access code:</p>
    <form method='POST' action="?/code" use:enhance>
      <fieldset role='group'>
        <input id="code" type="text" name="code" bind:value={value}>
        <input type="submit" value="Create Code">
      </fieldset>
    </form>
  </div>

  {#if form?.goodId}
  <div class='success callout'>
    Created a new access code!
  </div>
  {/if}

  {#if form?.goodId == false}
  <div class='fail callout'>
    Failed to create a new access code; try a different one.
  </div>
  {/if}
      <div class='access-cards'>
        {#each data.accessCodes as code}
          <article>
            <p>{code.code}</p>
            <footer>
              <div class='buttons'>
                <form method="POST" action="/?power" use:enhance>
                  <input type="text" name="id" value={code.id} >
                  <button type="submit">
                    <Fa size="0.75x" icon={faPowerOff} />
                  </button>
                </form>
                <form method="POST" action="?/delete" use:enhance>
                  <input type="text" name="id" value={code.id} >
                  <button class='danger' type="submit">
                    <Fa size="0.75x"icon={faTrash} />
                  </button>
                </form>
              </div>
            </footer>
          </article>
        {/each}
      </div>
</section>
{/if}
{/if}
</div>
</div>
<style lang='scss'>
  .account {
    display: grid;
    grid-template-columns: auto auto auto;
  }
  aside {
    position: relative;
    left: 0;
    border-right: 1px solid whitesmoke;
    box-shadow: 5px 5px 5px 0px grey;
    height: 100vh;
    overflow-y: hidden;
    max-width: 18rem;
    padding: 2rem;
    gap: 1rem;
  }
  footer { margin-top: 0; padding: 8px; }

  .access-cards {
    padding-top: 2rem;
    article { padding-top: 8px; }
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    & * { flex: 0 2; flex-basis: 6rem; }
    gap: 1rem;
    form > button {
      padding: 8px;
      margin: 0;
    }
    p {
      font-size: 200%;
      font-weight: bold;
      padding: 0;
      margin: 0;
    }
  }
  #refresh {
    background-color: white;
    color: black;
  }
  .buttons { input { display: none;}}
</style>
