<script lang='ts'>
  import FilterAnchorPill from '$lib/components/FilterAnchorPill.svelte'
  import { dbObjTitles } from '$lib/utils'
  import ElementPanel from '../components/ElementPanel.svelte'
  import Element from '../components/Element.svelte'
  import SearchBar from '../components/SearchBar.svelte'
  import Fa from 'svelte-fa'
  import { faX } from '@fortawesome/free-solid-svg-icons'

  let { data } = $props();

  let selected = $state(-1)

  function sel(i:number) { selected = i; console.log("selecte") }
</script>
<div class='page'>
  <div class='results container'>
    <section class='long'>
      <h1>Search CS Lessons & Resources</h1>
      <p>Use the search bar and filters to browse our library of computer science resources!</p>
      <div class='sticky'>
        <SearchBar filters />
      </div>
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
        {#each data.elements as el, i}
          {#if i == selected}
            <tr class='selected'>
              <td>
                <div class='ui-buttons'>
                  <a href="/teach/library/browse/{el.path}" target="_blank" role='button'>Open</a>
                  <button>Save</button>
                  <button onclick={()=>selected=-1} class='close'>Dismiss</button>
                </div>
              </td>
              <td colspan="5">
                <Element user={data.user} obj={el} />
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
    </section>
  </div>
  <div class='data-view'>
  </div>
</div>

<style lang='scss'>
  // tr { display: flex; }
  table {
    @import "$lib/styles/table";
    @include hoverable;
  }
  // tr:hover {
  //   cursor: pointer;
  //   & > td { background-color: whitesmoke; }
  // }
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
  .page {
    display: flex;
    flex-direction: row;
  }
  .results { padding: 0 2rem; }
  .results { flex-grow: 1; }
  .long {
    // height: 400vh;// TODO: get rid of this eventually 
  }
  .sticky {
    background-color: white;
    box-shadow: 0 1rem 1rem white;
    padding: 1rem 0;
    margin-bottom: 2rem;
    position: sticky;
    top: 0;
    z-index: 99;
  }
  .data-view {
    // position: relative;
    // right: 0;
    padding: 0;
    background-color: pink;
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
      border-radius: 0;
      width: 100%;
      flex: 1;
      // background-color: white;
      font-size: 11pt;
    }
  }
</style>
