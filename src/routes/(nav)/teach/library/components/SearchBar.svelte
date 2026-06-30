<script lang='ts'>
  import { enhance } from '$app/forms';
    import { faSliders} from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'

    let form = $state();

    const dict = {
      "Grade(s)": "grade",
      "Audience(s)": "audience",
      "Subject(s)": "subject",
      "Resource Type(s)": "type",
      "Tag(s)": "tag",
      "SOL(s)": "sol"
    }

    let filterToggle = $state(false)
    let { filters } = $props()



    const query = $state(Object.create({
      text: ""
    }))
    // load filters from API to preserve component portability
    async function search() {
      // form.submit()
    //   console.log("Sending search..")
  		// await fetch('/teach/library/search', {
  		// 	method: 'POST',
  		// 	body: JSON.stringify(query)
  		// });
    }
</script>
{#snippet dropdown(label: string, list)}
<div class='dropdown-wrap'>
  <p class='dropdown-label'>{label}</p>
  <details class="dropdown">
    <!-- svelte-ignore a11y_no_redundant_roles -->
    <summary class='dropdown-button secondary' role='button'>
      Select one or more...
    </summary>
    <ul>
      {#each list as l}
      <li class='dropdown-item'>
        <label>
          <input type="checkbox" name={dict[label]} value={l.id} />
          {l.title}
        </label>
      </li>
      {/each}
    </ul>
  </details>
</div>
{/snippet}
<div class='search'>
<form method="GET" action="/teach/library/search">
  <!-- svelte-ignore a11y_no_redundant_roles -->
  <fieldset role="group" >
    <input name="q" id="q" type="text" placeholder="Search for lessons..." />
    {#if filters }
    <button onclick={() => filterToggle = !filterToggle}><Fa size=1.0x icon={faSliders} /> <span>Filters</span></button>
    {/if}
    <input class='search-button' type="submit" value="Search" />
  </fieldset>
  {#if filters}
  <div class='filters {filterToggle? 'selected':''}'>
      {@render dropdown("Grade(s)", filters.grades)}
      {@render dropdown("Subject(s)", filters.subjects)}
      {@render dropdown("Resource Type(s)", filters.elementTypes)}
      {@render dropdown("Audience(s)", filters.audiences)}

  </div>
  {/if}
</form>
</div>

<style lang='scss'>
  .search {
    display: flex;
    flex-direction: row;
    margin-bottom: 0;
    padding-bottom: 0;
    fieldset { margin: 0; }
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
  .filters {
    gap: 12px;
    display: flex;
    flex-direction: row;
    background-color: pink;
    margin-bottom: 4rem;
    margin-top: 1rem;
  }
  .filters { height: 0; transition: height 500ms ease-in; }
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
