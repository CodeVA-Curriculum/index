<script lang='ts'>
  import FilterAnchorPill from '$lib/components/FilterAnchorPill.svelte'
  import { dbObjTitles } from '$lib/utils'
  import ElementPanel from '../components/ElementPanel.svelte'
  import Element from '../components/Element.svelte'
  import SearchBar from '../components/SearchBar.svelte'
  import ElementTable from '../components/ElementTable.svelte'
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
        <SearchBar filters={data.elements.length == 0} />
      </div>
    </section>
    <section>
      {#if data.elements.length == 0}
      <div class='no-elements'>
        <p><i>Search above for CS lessons and resources, or click here to <a href="/teach/library/browse">browse the whole library</a></i></p>
      </div>
      {:else}
      <h1>Results</h1>
      <ElementTable elements={data.elements} user={data.user} filters={data.filters} />
      {/if}
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
      border-radius: 12px;
      width: 100%;
      flex: 1;
      font-size: 11pt;
    }
  }
  .no-elements {
    margin: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
