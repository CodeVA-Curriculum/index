<script lang='ts'>
  import ElementPanel from './components/ElementPanel.svelte'
  import Element from './components/Element.svelte'
  import SearchBar from './components/SearchBar.svelte'

  const items = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  let selected = 4
</script>
<div class='page'>
  <div class='container results'>
    <section>
      <h1>Search CS Lessons & Resources</h1>
      <p>Use the search bar and filters to browse our library of computer science resources!</p>
    </section>
    <section class='long'>
      <div class='sticky'>
        <SearchBar />
      </div>
      <table>
      <thead>
        <tr>
          <th scope="col">Grade</th>
          <th scope="col">Title</th>
        </tr>
      </thead>
      <tbody>
        {#each items as item, i}
          {#if i == selected}
            <tr style="background-color: powderblue;">
              <td colspan="2">
              <Element />
              </td>
            </tr>
          {/if}
          <tr>
            <td>Gr</td>
            <td>Title</td>
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
  .page {
    display: flex;
    flex-direction: row;
  }
  .results { padding: 0 2rem; }
  .results { flex-grow: 1; }
  .long {
    height: 400vh;// TODO: get rid of this eventually 
  }
  .sticky {
    position: sticky;
    top: 0;
  }
  .data-view {
    width: 40rem;
    background-color: pink;
  }
</style>
