<script lang='ts'>
  import AccessCodeCard from '$lib/components/AccessCodeCard.svelte'
	import { enhance } from '$app/forms';
  import Fa from 'svelte-fa'
  import { faChartLine, faTrash, faRefresh, faPowerOff } from'@fortawesome/free-solid-svg-icons'
  import { dashboardURL } from '$lib'
  let { data, form } = $props()
  console.log(data.session)
  console.log(data.accessCode)
  console.log(data.elements)
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
</script>

{#snippet feedback(form)}
{#if form?.res}
<article class='feedback'>
  <p>{form.res}</p>
</article>
{/if}
{/snippet}


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
  <div class='heading-wrap'>
  <h2 id="library">Access Codes</h2>
  </div>
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
          <AccessCodeCard code={code} />
        {/each}
      </div>
</section>
{/if}

  {#await data.guides}
  {:then}
<section>
  <h2>Learning Resources</h2>
  <p>TODO: completion stats</p>
  {#each data.guides as guide}
    <article>
      <p>{guide.title}</p>
    </article>
  {/each}
  <hr>
</section>
{/await}
{#await data.elements}
{:then}
<section>
  <h2>Teaching Resources</h2>
  {#each data.elements as element}
    <article>
      <p>{element.title}</p>
    </article>
  {/each}
  <hr>
</section>
{/await}
{/if}
<style lang='scss'>
  @use "$lib/styles/theme.scss";
  .account {
    display: grid;
    grid-template-columns: auto auto auto;
  }
  footer { margin-top: 0; padding: 8px; }

  .access-cards {
    padding-top: 2rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
  #refresh {
    background-color: white;
    color: black;
  }
  .heading-wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & h2 { flex: 1; }
    & a {
      flex: 0 1;
      background-color: white;
      border: 1px solid theme.$text;
      color: theme.$text;
      font-size: 14pt;
      white-space: nowrap;
    }
  }
</style>
