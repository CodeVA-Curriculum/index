<script lang='ts'>
	import { enhance } from '$app/forms';
  import Fa from 'svelte-fa'
  import { faTrash, faRefresh, faPowerOff } from'@fortawesome/free-solid-svg-icons'
  import { dashboardURL } from '$lib'
  let { data, form } = $props()
  console.log(data.user)
  let value = $state(generate())
  let accountOwner = data.user?.id && data.session?.alias == "NULL"
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
  const noReset = () => {  
    return async ({ update }) => {  
      update({ reset: false });  
    };  
  }
</script>

{#snippet feedback(form)}
{#if form?.res}
<article class='feedback'>
  <p>{form.res}</p>
</article>
{/if}
{/snippet}

<div class='account'>
{#if data.user && data.session}
<aside>
  <nav>
    <p>Settings</p>
    <hr>
    <ul>
      <li><a href={dashboardURL} target="_blank">Homepage</a></li>
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
  <h1>Hello, { data.user.username? data.user.username : "visitor" }!</h1>
  {#if data.user && data.session?.alias != "NULL"}
  <p>You are logged in with under access code {data.session?.alias}.</p>
  {/if}
  </section>
{#if accountOwner}
  <section>
  <h2 id="library">Access Codes</h2>
  <div class='create-code'>
    <p>Create a new access code:</p>
    <form method='POST' action="?/code" use:enhance>
      <fieldset role='group'>
        <input id="code" type="text" name="alias" bind:value={value}>
        <input type="submit" value="Create Code">
      </fieldset>
    </form>
  </div>

  {@render feedback(form)}

      <div class='access-cards'>
        {#each data.codes as code}
          <article>
            <p>{code.alias}</p>
            <div>
              <span class='tag {code.active ? "active" : "inactive"}'>{code.active ? "Active" : "Inactive"}</span>
            </div>
            <footer>
              <div class='buttons'>
                <form method="POST" action="?/power" use:enhance={noReset}>
                  <input type="text" name="id" value={code.id} >
                  <input type="text" name="status" value={!code.active} >
                  <button type="submit">
                    <Fa size="0.75x" icon={faPowerOff} />
                  </button>
                </form>
                <form method="POST" action="?/delete" use:enhance={noReset}>
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
  @use "$lib/styles/theme.scss";
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
    div {
      display: flex;
      margin-bottom: .5rem;
      & * { flex: 1; }
      .active { background-color: theme.$highlight-green; }
      .inactive { background-color: theme.$orange; }
    }
  }
  #refresh {
    background-color: white;
    color: black;
  }
  .buttons { input { display: none;}}
</style>
