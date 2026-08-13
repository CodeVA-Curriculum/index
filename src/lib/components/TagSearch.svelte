<script lang='ts'>
  import Pill from '$lib/components/Pill.svelte'
  import Fa from 'svelte-fa'
  import {faX} from '@fortawesome/free-solid-svg-icons'
    let { filters, checks, selected=$bindable([])} = $props()
    let tagSearch = $state('')
    let filteredTags = $state([])
    $effect(() => {
      filteredTags = filters?.tags.filter((o) => o.title.includes(tagSearch))
    })
    let tagDisplay = $state(true);
    $effect(() => console.log(checks))
    function handleFocus(e) {
      tagDisplay = true
    }

</script>
<div class='tag-select'>
<button class='tag-dropdown-button' role='button' >
  <label>
    Tag(s):
    <div class='tag-input'>
      <input onfocus={handleFocus} bind:value={tagSearch} placeholder="Search tags..." type='text ' />
      <span class='secondary' role="button" onclick={() => checks.splice(0, checks.length)}>
        <Pill style='light'>{checks.length}</Pill>
        {#if checks.length > 0}
        <Fa onclick={() => tagDisplay = false} icon={faX} />
        {/if}
      </span>
    </div>
  </label>
</button>
{#if tagDisplay}
<div class='tag-display has-shadow'>
  <div class='selected-tags'>
    {#each checks as tag, i}
      <span class='tag'>
        {tag.title}
        <button onclick={() => checks.splice(i, 1)}><Fa icon={faX} /></button>
      </span>
    {/each}
  </div>
  <hr>
  <div class='all-tags'>
  {#each filteredTags as tag}
    <span class='tag'><a onclick={() => checks.push(tag)}>{tag.title}</a></span>
  {/each}
  </div>
</div>
<div class='tag-foot'>
  <button onclick={() => tagDisplay = false}>Close</button>
  <button onclick={() => checks.splice(0, checks.length)}>Clear</button>
</div>
{/if}
</div>
<style lang='scss'>
  @use "$lib/styles/theme.scss";
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
    .tag-foot{
      display: flex;
      flex-direction: row;
      height: 2rem;
      padding: 0 4px;
      position: relative;
      top: -40px;
      gap: 8px;
      width: 100%;
      align-items: flex-end;
      padding-bottom: 4px;
      background-color: white;
      button { padding: 0; height: 1.5rem; font-size: 12pt; flex: 1; }
    }
    .tag-display {
      padding: .5rem;
      overflow-y:scroll;
      position: relative;
      z-index: 0;
      background-color: white;
      width: 100%;
      height: 280px;
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
    span[role="button"] { 
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 12pt;
      padding: 8px 8px;
      margin: 0;
      flex: 0 2; 
      margin-bottom: 1rem;
    }

  }
  </style>
