<script lang='ts'>
  import ProjectListItemSearch from './ProjectListItemSearch.svelte'
  import ProjectPanel from './ProjectPanel.svelte'
  import { Project } from './Project.svelte'
  import { Node } from './Node.svelte'
  import ElementTabs from './ElementTabs.svelte'
  import DetailsIcons from './DetailsIcons.svelte'
  import TutorialListItem from '$lib/components/guide/TutorialListItem.svelte'
  import ProjectListItem from '$lib/components/guide/ProjectListItem.svelte'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { faX } from '@fortawesome/free-solid-svg-icons'
  let { hoverList = $bindable([]), title, map, children} = $props()

  function mouseIn(item:Node|Project) {
    if(!hoverList.includes(item.db.path)) {
      hoverList.push(item.db.path)
    }
    console.log("hover in")
  }

  function mouseOut(item:Node|Project) {
    if(hoverList.includes(item.db.path)) {
      hoverList.splice(hoverList.findIndex((path) => path == item.db.path), 1)
    }
    console.log("hoverout")
  }

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
  let res = $state([])
  let mode = $derived.by(() => {
    if(title == 'projects' || title == "tutorials") { return modes.LIST }
    else {
      return modes.ELEMENT
    }
  })
  let history:string[] = $state([])
  $effect(() => {
    // track panels during life of component
    if(history.length == 0) { history.push(title); return }
    if(history[history.length-1] != title) {
      history.push(title)
    }
  })
</script>

{#snippet listHeader(title)}
    <h2>{title.charAt(0).toUpperCase() + title.substring(1)}</h2>
    <ProjectListItemSearch input={list} bind:results={res} />
{/snippet}

{#snippet elementHeader(obj)}
    <h2>{obj.db.title}</h2>
    <DetailsIcons eltype={0} />
{/snippet}

{#snippet elementContent(obj)}
  {#if obj instanceof Node}
  <ElementTabs {obj} />
  {:else if obj instanceof Project}
  <ProjectPanel project={obj} />
  {/if}
{/snippet}

<div class='panel-list'>
  <div class='close'>{@render children?.()}</div>
    {#if history.length > 1}
    <nav aria-label="breadcrumb">
      <ul class='subtitle'>
        {#if history.length > 1}
        {#each history as h, i}
          {#if i > 0}
          <li>{h == 'projects' || h == 'tutorials' ? h.charAt(0).toUpperCase() + h.substring(1) : map.elementsByPath[h].db.title}</li>
          {/if}
        {/each}
        {/if}
      </ul>
    </nav>
    {/if}
  <div class='head'>
    {#if mode == modes.LIST}
      {@render listHeader(title)}
    {:else if mode == modes.ELEMENT || mode == modes.PROJECT}
      {@render elementHeader(map.elementsByPath[title])}
    {/if}
  </div>
  <hr>
  <div class='lists'>
    {#if mode == modes.LIST}
    <ul>
      {#each res as item}
        <div on:mouseenter={() => mouseIn(item)} on:mouseleave={() => mouseOut(item)} class='hover-bound'>
          <ProjectListItem map={true} obj={item} />
        </div>
      {/each}
    </ul>
    {:else if mode == modes.ELEMENT}
      {@render elementContent(map.elementsByPath[title])}
    {/if}
  </div>
</div>

<style lang='scss'>
  @import "$lib/styles/theme.scss";
  .hover-bound {
    margin: 1rem 0;
  }
  .subtitle {
    font-size: 0.75rem;
  }
  nav {
    position: absolute;
    top: 0;
  }
  .head {
    margin: 0 1rem;
    margin-top: 3rem;
    position: relative;
  }
  .panel-list {
    padding: 0rem;
    height: 100%;
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
  nav { margin: 0 1.5rem; }
  .lists ul {
    overflow-y: scroll;
    & > * {
      padding: 0;
    }
  }
</style>
