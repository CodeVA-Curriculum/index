<script lang='ts'>
  import Element from './Element.svelte'
  let { elements, user, session } = $props()
  let selected = $state(-1)
  let locked = $state(!elements[selected]?.path.includes(session?.scope))
  function sel(i:number) { selected = i; console.log("selected") }
</script>
<table>
  <colgroup>
    <col>
    <col class='narrow'>
    <col>
    <col>
    <col>
  </colgroup>
<thead>
  <tr>
    <th scope="col">Grades</th>
    <th class='title' scope="col">Title</th>
    <th scope="col">Type</th>
    <th scope="col">Subjects (CS+)</th>
    <th class='tags' scope="col">Tags</th>
  </tr>
</thead>
<tbody>
  {#each elements as el, i}
    {#if i == selected}
      <tr class='selected'>
        <td>
          <div class='ui-buttons'>
            {#if locked}
            <a class='premium' href="https://codevirginia.org/" target="_blank" role="button">Access</a>
            {/if}
            <a href="/teach/library/browse/{el.path}" target="_blank" role='button'>Open</a>
            {#if !locked}
            <button disabled>Save</button>
            {/if}
            <button onclick={()=>selected=-1} class='close'>Dismiss</button>
          </div>
        </td>
        <td colspan="5">
          <Element session={session} user={user} obj={el} />
        </td>
      </tr>
    {:else}
    <tr onclick={() => sel(i)}>
      <td>{el.gradesAbbr}</td>
      <td class=''>{el.title}</td>
      <td>{el.types[0].title}</td>
      <td>
        {#if el.subjects.length < 5}
        {#each el.subjects.filter((o) => o.abbr != 'CS') as subj}
          <span class='tag light'>{subj.abbr}</span>
        {/each}
        {/if}
      </td>
      <td class='tags'>
        <div>
        {#each el.tags as tag}
          <span class='tag light'>{tag.title}</span>
        {/each}
        </div>
      </td>
    </tr>
    {/if}
  {/each}
</tbody>
</table>
<style lang='scss'>
  @use "$lib/styles/theme";
  table {
    @import "$lib/styles/table";
    @include hoverable;
  }
  th.title {
    min-width: 400px;
  }
  td.tags {
    min-width: 100px;
    max-width: 200px;
    & > div {
      overflow-y: scroll;
    }
  }
  .selected { position: relative; & > td { padding: 1rem 0; background-color: whitesmoke; padding-left: 1rem; padding-right: 1rem; } }

  // Table styles
  .narrow {
    width: 50px;
    overflow-x: hidden;
  }
  .ui-buttons {
    margin-top: 1rem;
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-size: 11pt;
    align-items: center;
    justify-content: center;
    gap: 12px;
    * {
      width: 100%;
      flex: 1;
      // background-color: white;
      font-size: 11pt;
    }
  }
  .no-elements {
    margin: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .premium {
    background-color: theme.$premium-light;
    border-color: transparent;
    color: white;
  }
</style>
