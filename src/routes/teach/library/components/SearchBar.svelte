<script>
    import { faSliders} from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'

    let filterToggle = $state(false)
</script>
{#snippet dropdown(label, list)}
<div class='dropdown-wrap'>
  <p class='dropdown-label'>{label}</p>
  <details class="dropdown">
    <summary class='dropdown-button secondary' role='button'>
      Select one or more...
    </summary>
    <ul>
      {#each list as l}
      <li class='dropdown-item'>
        <label>
          <input type="checkbox" name={l} />
          {l}
        </label>
      </li>
      {/each}
    </ul>
  </details>
</div>
{/snippet}
<div class='search'>
<form>
  <fieldset role="group">
    <input type="text" />
    <button onclick={() => filterToggle = !filterToggle}><Fa size=1.0x icon={faSliders} /> <span>Filters</span></button>
    <input class='search-button' type="submit" value="Search" />
  </fieldset>
  <div class='filters {filterToggle? 'selected':''}'>
      {@render dropdown("Grade(s)", ["a", "b", "c"])}
      {@render dropdown("Subject(s)", ["a", "b", "c"])}
      {@render dropdown("Resource Type(s)", ["a", "b", "c"])}
      {@render dropdown("Audience(s)", ["a", "b", "c"])}

      <div>
        <p class='dropdown-label'>Tags</p>
        <fieldset class="tag-search" role='group'>
          <input type='text' />
        </fieldset>
    </div>
  </div>
</form>
</div>

<style lang='scss'>
  .search {
    display: flex;
    flex-direction: row;
  }
  form { flex: 1; }
  .search-button { width: 260px; }
  button { display: flex;
    justify-content: center;
    align-items: center;
    background-color: white; color: black;
    * { margin-left: 0.5rem; &:first-child { margin-left: 0; } }
  }
  .dropdown {
    // min-width: 180px;
  }
  .dropdown-button {
    font-style: italic;
    padding: 0.5rem;
    font-size: 12pt;
  }
  .dropdown-item {
    padding: 0.25rem;
    padding-left: 1rem;
    font-size: 12pt;
    input {
      width: 18px;
      height: 18px;
    }
  }
  p.dropdown-label {
   font-size: 12pt; 
   margin: 0 0;
   padding-bottom: 4px;
   font-weight: bold;
  }
  .filters, .dropdowns{
    gap: 12px;
    display: flex;
    flex-direction: row;
  }
  .filters { height: 0; transition: height 500ms ease-in; overflow-y: hidden; }
  .filters.selected { height: auto; overflow: clip;}
  .tag-search {
  // display: block;
    font-size: 12pt;
    input {
      padding: 0.5rem;
      font-size: 12pt;
      height: 2.30rem;
    }
    
  }
  .dropdown-wrap {
    flex: 1;
  }
</style>
