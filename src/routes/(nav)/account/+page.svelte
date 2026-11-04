<script lang='ts'>
  import Pill from '$lib/components/Pill.svelte'
  import { getCompleted } from '$lib/utils'
  import { page } from '$app/state'
  import Element from  '$routes/(nav)/teach/library/components/Element.svelte'
  import GuideListItem from '$lib/components/guide/GuideListItem.svelte'
  import ElementTable from '$routes/(nav)/teach/library/components/ElementTable.svelte'
  import AccessCodeCard from '$lib/components/AccessCodeCard.svelte'
	import { enhance } from '$app/forms';
  import Fa from 'svelte-fa'
  import { faChartLine, faTrash, faRefresh, faPowerOff } from'@fortawesome/free-solid-svg-icons'
  import { dashboardURL } from '$lib'
  let { data, form } = $props()
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
{#if form?.res || page?.url.searchParams.get('m')}
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

{#if accountOwner}
  <section>
  <details open>
    <summary>
    <div class='heading-wrap'>
      <h2 id="library">Access Codes </h2>
      <div>
      <Pill style='large'>{data.codes?.length}</Pill>
      </div>
    </div>
  </summary>
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
    </details>
</section>
{/if}

  {#await data.guides}
  {:then}
<section>
  <details open>
    <summary>
    <h2>Learning Resources</h2>
    </summary>
  <p></p>
  <table>
    <colgroup>
      <col>
      <col>
      <col>
    </colgroup>
  <thead>
    <tr>
      <th class='title' scope="col">Title</th>
      <th scope="col">Completed Tutorials</th>
      <th scope="col">Completed Projects</th>
    </tr>
  </thead>
  <tbody>
  {#each data.guides as guide}
    <tr>
      <td><a href="/learn/{guide.path.substring(0,guide.path.indexOf('/'))}">{guide.title}</a></td>
      <td>{getCompleted(guide.locations)} / {guide.locations.length}</td>
      <td>{getCompleted(guide.projects)} / {guide.projects.length}</td>
    </tr>
  {/each}
  </tbody>
  </table>
  </details>
</section>
{/await}
{#await data.elements}
{:then}
<section>
  <details open>
    <summary>
  <h2>Teaching Resources</h2>
  </summary>
  <ElementTable {...data} />
    </details>
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
    div {
      display: flex;
      flex: 1 0;
      align-items: center;
    }
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & h2 { position: relative; margin-bottom: 0; margin-right: 12px; flex: 0 1; white-space: nowrap;  align-items: center; }
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
  details { position: relative; }
  details > summary{
    padding-left: 2rem;
    font-size: 70pt;
    h2 {
      font-size: 24pt;
    }
  }::after {
    position: absolute;
    left: 0;
    top: 0.25rem;
    
  }
</style>
