<script lang='ts'>
  import FilterAnchorPill from '$lib/components/FilterAnchorPill.svelte'
  import { dbObjTitles } from '$lib/utils'
  import ElementPanel from '../components/ElementPanel.svelte'
  import Element from '../components/Element.svelte'
  import SearchBar from '../components/SearchBar.svelte'

  let { data } = $props();

  const items = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  let selected = 4
</script>
<div class='page'>
  <div class='results container'>
    <section class='long'>
      <h1>Search CS Lessons & Resources</h1>
      <p>Use the search bar and filters to browse our library of computer science resources!</p>
      <div class='sticky'>
        <SearchBar />
      </div>
      <table>
        <colgroup>
          <col class='narrow'>
          <col>
          <col>
          <col>
          <col>
          <col>
          <col>
          <col>
        </colgroup>
      <thead>
        <tr>
          <th scope="col">Grades</th>
          <th scope="col">Title</th>
          <th scope="col">Type</th>
          <th scope="col">Items</th>
          <th scope="col">Subjects</th>
          <th scope="col">Audiences</th>
          <th scope="col">Tags</th>
          
        </tr>
      </thead>
      <tbody>
        {#each data.elements as el, i}
          {#if i == selected}
            <tr class='selected' style="background-color: powderblue;">
              <td colspan="7">
              <Element obj={el} />
              </td>
            </tr>
          {/if}
          <tr>
            <td>{el.gradesAbbr}</td>
            <td class='title'>{el.title}</td>
            <td><FilterAnchorPill obj={el.types[0]} />{el.types.length-1 > 0? ' +' + String(el.types.length-1):''}</td>
            <td>TODO:</td>
            <td>{#each el.subjects as s}<FilterAnchorPill obj={s} />{/each}</td>
            <td>{#each el.audiences as a}<FilterAnchorPill obj={a} />{/each}</td>
            <td>{#each el.tags as t }<FilterAnchorPill obj={t} />{/each}</td>
          </tr>
        {/each}
      </tbody>
    </section>
  </div>
  <div class='data-view'>
    <ElementPanel />
  </div>
</div>

<style lang='scss'>
  // tr { display: flex; }
  td {
    // line-height: 1;
    // padding: 2px;
    // flex: 1 1 1;
    max-width: 50px;
    overflow-x: hidden;
  &.title { min-width: 100px; max-width: 200px; }
  }
  tr:hover { background-color: powderblue; cursor: pointer; }
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
  .selected { & > td { padding: 1rem 0; } }

  // Table styles
  .narrow {
    width: 50px;
    overflow-x: hidden;
  }
</style>
