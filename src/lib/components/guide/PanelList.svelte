<script lang='ts'>
  import DetailsIcons from './DetailsIcons.svelte'
  import ElementView from './ElementView.svelte'
  import TutorialListItem from '$lib/components/guide/TutorialListItem.svelte'
  import ProjectListItem from '$lib/components/guide/ProjectListItem.svelte'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { faX } from '@fortawesome/free-solid-svg-icons'
  let { title, map, children} = $props()

  const modes = {
    LIST: 0,
    ELEMENT: 1
  }

  let list = $derived.by(() => {
    if(title == 'projects') { return map.projects }
    else if(title == 'tutorials') { return map.nodes }
    else {
      return [ ]
    }
  })
  let mode = $derived.by(() => {
    if(title == 'projects' || title == "tutorials") { return modes.LIST }
    else {
      return modes.ELEMENT
    }
  })
</script>

{#snippet listHeader(title)}
    <h2>{title.charAt(0).toUpperCase() + title.substring(1)}</h2>
    <fieldset role="group">
      <input type="text">
      <input class='filter' type='button' value="Filters">
    </fieldset>
{/snippet}

{#snippet elementHeader(obj)}
  <h2>{obj.db.title}</h2>
  <DetailsIcons eltype={0} />
{/snippet}

{#snippet elementContent(obj)}
  <p>{obj.db.title}</p>
{/snippet}

<div class='panel-list'>
  <div class='close'>{@render children?.()}</div>
  <div class='head'>
    {#if mode == modes.LIST}
      {@render listHeader(title)}
    {:else if mode == modes.ELEMENT}
      {@render elementHeader(map.elementsByPath[title])}
    {/if}
  </div>
  <hr>
  <div class='lists'>
    {#if mode == modes.LIST}
    <ul>
      {#each list as item}
        <ProjectListItem map={true} obj={item} />
      {/each}
    </ul>
    {:else if mode == modes.ELEMENT}
      {@render elementContent(map.elementsByPath[title])}
    {/if}
  </div>
</div>

<style lang='scss'>
  @import "$lib/styles/theme.scss";
  .head {
    margin-top: 2rem;
  }
  .panel-list {
    padding: 1rem;
  }
  input {
  height: 2rem;
  padding: 0;
  }
  .filter {
  padding: 0 0.5rem;
    background-color: $dark-blue;
  }
  .close{ position: absolute; right: 0; top: 0;}
  .lists ul {
    overflow-y: scroll;
    & > * {
      margin: 0;
      padding: 0;
    }
  }
</style>
