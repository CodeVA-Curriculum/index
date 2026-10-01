<script lang='ts'>
  import { page } from '$app/navigation'
  import Element from  '/home/apollo/GitHub/index/src/routes/(nav)/teach/library/components/Element.svelte'
  import GuideListItem from '$lib/components/guide/GuideListItem.svelte'
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
{#if form?.res || page.url.searchParams.get('m')}
<article class='feedback'>
  <p>{form?.res}</p>
  <p>{page.url.searchParams.get('m')}</p>
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
  <p>You are logged in with under access code {data.session?.alias}. You can browse the materials you have access to by viewing the list(s) below.</p>
  {:else}
  <p>You can browse the materials you've purchased access to by viewing the list(s) below. Create access codes to grant others access to your materials.</p>
  {/if}
  </section>

  {#await data.guides}
  {:then}
<section>
  <h2>Learning Resources</h2>
  <p></p>
  {#each data.guides as guide}
    <GuideListItem long {guide} />
  {/each}
  <hr>
</section>
{/await}
{#await data.elements}
{:then}
<section>
  <h2>Teaching Resources</h2>
  {#each data.elements as element}
    <Element accessCode={data.accessCode} user={data.user} session={data.session} obj={element} />
  {/each}
  <hr>
</section>
{/await}
{/if}
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
      <hr>
</section>
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
  section { padding-right: 2rem; }
  p { margin-bottom: 2rem; }
</style>
