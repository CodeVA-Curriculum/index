<script lang='ts'>
  import TagSearch from '$lib/components/TagSearch.svelte'
  import StandardsSelect from '$lib/components/pacing-guide/StandardsSelect.svelte'
  import Standard from '$lib/components/Standard.svelte'
  import { getGradeStyle } from '$lib'
  import Fa from 'svelte-fa'
  import { faBoltLightning, faPlus } from '@fortawesome/free-solid-svg-icons'
  import Element from './Element.svelte'
  import Pill from '$lib/components/Pill.svelte'
  let { elements, user, session, filters, navTo=(s) => '/teach/library/browse/'+s} = $props()
  let selected = $state(-1)
  let filteredElements = $state(elements)
  let locked = $state(!elements[selected]?.path.includes(session?.scope))
  function sel(i:number) { selected = i; console.log("selected") }
  let textSearch = $state();

  function handleStandards(list) {
    console.log('handling standards...')
    checks['standard'] = list
  }
  
  let filterToggle = $state(false)
    const dict = {
      "Grade(s)": "grade",
      "Audience(s)": "audience",
      "Subject(s)": "subject",
      "Resource Type(s)": "type",
      "Tag(s)": "tag",
      "SOL(s)": "sol"
    }
  let checks = $state({
    "grade": [],
    "audience": [],
    "subject": [],
    "type": [],
    "tag": [],
    "standard": []
  })
  for(const g of filters.grades) {
    checks["grade"] = [...checks["grade"], false]
  }
  for(const g of filters.audiences) {
    checks["audience"] = [...checks["audience"], false]
  }
  for(const g of filters.elementTypes) {
    checks["type"] = [...checks["type"], false]
  }
  for(const g of filters.subjects) {
    checks["subject"] = [...checks["subject"], false]
  }
  function isEmpty(checkList) {
    for(const i of checkList) {
      if(i) { return false }
    }
    return true
  }
  $effect(() => {
    console.log("filtering..")
    filteredElements = elements.filter((o) => {
      const criteria = [ // if all of these pass, the element passes
        (overlap(checks['tag'], o.tags, filters['tags'])) || isEmpty(checks['tag']),
        (overlap(checks['grade'], o.grades, filters['grades']) || isEmpty(checks['grade'])),
        (overlap(checks['subject'], o.subjects, filters['subjects']) || isEmpty(checks['subject'])),
        (overlap(checks['type'], o.types, filters['elementTypes']) || isEmpty(checks['type'])),
        (overlap(checks['audience'], o.types, filters['audiences']) || isEmpty(checks['audience'])),
        (overlapNoCheck(o.standards, checks['standard']) || checks['standard'].length == 0)

      ]
      let res = true
      for(const criterion of criteria) {
        res = res && criterion
      }
      return res
    })
  })
  function overlap(checks,elList,wholeList) {
    const selectedIds = []
    for(let i=0;i<checks.length;i++) { if(checks[i]) { selectedIds.push(wholeList[i].id)}}
    for(const l of elList) {
      const matching = selectedIds.filter((id) => id == l.id)
      if(matching.length > 0) { return true }
    }
    return false
  }
  function overlapNoCheck(elList,wholeList) {
    for(const l of elList) {
      const matching = wholeList.filter((o) => o.id == l.id)
      if(matching.length > 0) { return true }
    }
  }
  function getNumberChecked(list) {
    const trues = list.filter((b)=> b)
    return trues.length
  }
</script>
{#snippet dropdown(label: string, list)}
<div class='dropdown-wrap'>
  <p class='dropdown-label'>{label}</p>
  <details class="dropdown">
    <!-- svelte-ignore a11y_no_redundant_roles -->
    <summary class='dropdown-button' role='button'>
      <span>Select...<Pill style='light'><span style='font-style: normal;'>{getNumberChecked(checks[dict[label]])}</span></Pill></span>
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

{#if filters.text}
<div class='searchbar'>
  <input bind:value={textSearch} placeholder="Search among titles..." />
</div>
{/if}

{#if filters}
<div class="filters {filterToggle? 'selected':''}">
    {@render dropdown("Grade(s)", filters.grades)}
    {@render dropdown("Subject(s)", filters.subjects)}
    {@render dropdown("Resource Type(s)", filters.elementTypes)}
    {@render dropdown("Audience(s)", filters.audiences)}
    <TagSearch filters={filters} bind:checks={checks['tag']} />
  </div>
<StandardsSelect onclose={handleStandards} />
{/if}

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
  {#each filteredElements as el, i}
    {#if i == selected}
      <tr class='selected'>
        <td>
          <div class='ui-buttons'>
            {#if locked}
            <a class='premium' href="https://codevirginia.org/" target="_blank" role="button">Sign In</a>
            {/if}
            <a href={navTo(el.path)} target="_blank" role='button'>Open</a>
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
      <td ><Pill style={getGradeStyle(el) + ' medium'}>{el.gradesAbbr}</Pill></td>
      <td class=''>{#if el.locked}<span class='picon'><Fa icon={faBoltLightning} /></span>{/if}{el.title}</td>
      <td>{el.types[0].title}</td>
      <td class='tags'>
        <div>
          {#if el.subjects.length < 5}
          {#each el.subjects.filter((o) => o.abbr != 'CS') as subj}
            <span class='tag light'>{subj.abbr}</span>
          {/each}
          {/if}
        </div>
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
      display: flex;
      flex-direction: row;
      gap: 4px;
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
  .picon {
    color: fuchsia;
    margin-right: 12px;
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
  p.dropdown-label {
   font-size: 12pt; 
   margin: 0 0;
   padding-bottom: 4px;
   font-weight: bold;
  }
  .dropdown-button {
    font-style: italic;
    padding: 0.5rem;
    font-size: 12pt;
    background-color: white;
    color: theme.$text;
    border-color: theme.$text;
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
  .searchbar input {
    font-size: 12pt;
    padding: .5rem .5rem;
    padding-left: 1rem;
  }
</style>
