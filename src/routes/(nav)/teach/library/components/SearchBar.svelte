<script lang='ts'>
  import TagSearch from '$lib/components/TagSearch.svelte'
  import StandardsSelect from '$lib/components/pacing-guide/StandardsSelect.svelte'
  import Pill from '$lib/components/Pill.svelte'
  import { enhance } from '$app/forms';
    import { faSliders, faX} from "@fortawesome/free-solid-svg-icons";
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
    console.log(filters)



    const query = $state(Object.create({
      text: ""
    }))
  function getNumberChecked(list) {
    const trues = list.filter((b)=> b)
    return trues.length
  }
  let checks = $state({
    "grade": [],
    "audience": [],
    "subject": [],
    "type": [],
    "tag": [],
    "standard": []
  })
  if(filters) {
    for(const g of filters.grades) {
      checks["grade"] = [...checks["grade"], false]
    }
    for(const g of filters.audiences) {
      checks["audience"].push(false)
    }
    for(const g of filters.elementTypes) {
      checks["type"] = [...checks["type"], false]
    }
    for(const g of filters.subjects) {
      checks["subject"] = [...checks["subject"], false]
    }
  }
</script>
{#snippet dropdown(label: string, list)}
<div class='dropdown-wrap'>
  <p class='dropdown-label'>{label}</p>
  <details class="dropdown">
    <!-- svelte-ignore a11y_no_redundant_roles -->
    <summary class='dropdown-button secondary' role='button'>
      Select one or more...<Pill style='light'>{getNumberChecked(checks[dict[label]])}</Pill>
    </summary>
    <ul>
      {#each list as l, i}
      <li class='dropdown-item'>
        <label>
          <input bind:checked={checks[dict[label]][i]} type="checkbox" name={dict[label]} value={l.id} />
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
    {#each checks['tag'] as tag}
      <input type='text' bind:value={tag.id} name="tag" style="visibility:hidden; position: absolute; width:0;height:0;" />
    {/each}
  </fieldset>
  {#if filters}
    <div class="filters {filterToggle? 'selected':''}">
      {@render dropdown("Grade(s)", filters.grades)}
      {@render dropdown("Subject(s)", filters.subjects)}
      {@render dropdown("Resource Type(s)", filters.elementTypes)}
      {@render dropdown("Audience(s)", filters.audiences)}
    <TagSearch bind:checks={checks['tag']} filters={filters} />
    </div>
    <StandardsSelect bind:selected={checks['standard']} />
  {/if}
</form>
</div>

<style lang='scss'>
  @use "$lib/styles/theme.scss";
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
  p.dropdown-label, label {
    color: theme.$text;
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
  .dropdown-wrap {
    flex: 1;
  }
  .tag-select {
    flex: 1 1;
    input { font-size: 12pt; height: 2.25rem;}
    .tag-display {
      padding: .5rem;
      overflow-y:scroll;
      position: relative;
      z-index: 99;
      background-color: white;
      width: 100%;
      height: 200px;
      .all-tags, .selected-tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      }
      & > * {
        flex: 0 1;
        a {
        color: white;
        text-decoration: none;
        }
        &:hover { cursor: pointer; }
      }
    }
  }
  button.tag-dropdown-button {
    text-align: left;
    padding: 0;
    margin: 0;
    border: none;
    position: relative;
    color: black;
    background-color: transparent;
    // display: none;
  }
  .tag-input {
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    input { flex: 1 0; }
    input[type="button"] { 
      padding: 0;
      margin: 0;
      aspect-ratio: 1/1;
      flex: 0 2; }

  }
</style>
