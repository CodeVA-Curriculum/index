<script lang='ts'>
  import Video from '$lib/components/Video.svelte'
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
  import { page } from '$app/state'
  import { faX, faRoute, faLocationDot } from '@fortawesome/free-solid-svg-icons'
  let { hoverList = $bindable([]), title, map, children} = $props()

  function mouseIn(item:Node|Project) {
    if(!hoverList.includes(item.db.path)) {
      hoverList.push(item.db.path)
    }
  }

  function mouseOut(item:Node|Project) {
    if(hoverList.includes(item.db.path)) {
      hoverList.splice(hoverList.findIndex((path) => path == item.db.path), 1)
    }
  }

  const modes = {
    LIST: 0,
    ELEMENT: 1,
    ONBOARDING: 2
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
    if(title == 'projects' || title == "tutorials") { 
      console.log("mode", modes.LIST)
      return modes.LIST }
    else if(title == 'onboarding') {
      return modes.ONBOARDING
    }
    else {
      console.log("mode", modes.ELEMENT)
      return modes.ELEMENT
    }
  })
</script>

{#snippet onboarding()}
  <h2>Using the Trail Guide</h2>
  <p>The trail guide is a set of resources to help you learn. Follow the instructions below to get started!</p>
  <Video />
{/snippet}

{#snippet onboardingBody()}
  <div class='onboarding-wrap'>
  <p>Trail guides are made up of <strong>tutorials</strong> (represented by the labeled circles on the map) and <strong>projects</strong>, which are collections of tutorials arranged in order to help you make something.</p>
  <p>Click the "Open in Map" button below to open the first tutorial we think you should start with (click "back" to return here after you're done exploring):</p>
  TODO: element card
  <p>Each tutorial has a video, a full text version of the video for you to read, and practice questions/prompts to help you practice your skills.</p>
  <p><strong>Projects</strong> provide you with details about which tutorials you might need to check out to learn how to make different kinds of work. You can view the path of our recommended "first project" by hovering over the card below. To lock the highlighted path color and view some details about the project, click "Open in Map" below (click "back" to return here).</p>
  <p>
  TODO: project card
  <p>As you work through a project by viewing its connected tutorials, you can mark them as complete to save your progress. If you run into any issues, please let us know!</p>
  </div>
{/snippet}

{#snippet listHeader(title)}
    <nav id="header-tabs">
      <ul>
        <li>
          <a role='button' href='?view=projects'
            class:select={page.url.searchParams.get('view').toLowerCase().includes('projects')}
            class:deselect={!page.url.searchParams.get('view').toLowerCase().includes('projects')}
          >
            <span><Fa icon={faRoute} /></span>Projects
          </a>
        </li>
        <li>
          <a role='button' href="?view=tutorials"
            class:select={page.url.searchParams.get('view').toLowerCase().includes('tutorials')}
            class:deselect={!page.url.searchParams.get('view').toLowerCase().includes('tutorials')}
          >
            <span><Fa icon={faLocationDot} /></span>Tutorials
          </a>
        </li>
      </ul>
    </nav>
    <ProjectListItemSearch input={list} bind:results={res} />
{/snippet}

{#snippet elementHeader(obj)}
  <div class='element-content'>
    <h2>{obj.db.title}</h2>
    <DetailsIcons obj={obj} eltype={obj instanceof Project ? 0 : 1} />
  </div>
{/snippet}

{#snippet elementContent(obj)}
  <div class='element-content'>
  {#if obj instanceof Node}
  <ElementTabs {obj} />
  {:else if obj instanceof Project}
  <ProjectPanel project={obj} />
  {/if}
  </div>
{/snippet}

<div class='panel-list'>
  <div class='nav-wrap'>
    <div class='close'>{@render children?.()}</div>
  </div>
  <div class='head'>
    {#if mode == modes.LIST}
      {@render listHeader(title)}
    {:else if mode == modes.ELEMENT || mode == modes.PROJECT}
      {@render elementHeader(map.elementsByPath[title])}
    {:else if mode == modes.ONBOARDING}
      {@render onboarding()}
    {/if}
  </div>
  <hr>
  <div>
    {#if mode == modes.LIST}
      <div class='lists'>
      {#each res as item}
        <div on:mouseenter={() => mouseIn(item)} on:mouseleave={() => mouseOut(item)} class='hover-bound'>
          <ProjectListItem map={true} obj={item} />
        </div>
      {/each}
      </div>
    {:else if mode == modes.ELEMENT}
      {@render elementContent(map.elementsByPath[title])}
    {:else if mode == modes.ONBOARDING}
      {@render onboardingBody()}
    {/if}
  </div>
</div>

<style lang='scss'>
  @use "$lib/styles/theme.scss";
  @use "$lib/styles/layout.scss";

  #header-tabs {
    @extend .tabs;
    width: 100%;
    li{
      flex: 1 0;
    }
    a[role='button'] {
      width: 100%;
      span { margin-right: 8px;}
    }
  }
  .hover-bound {
    margin: 1rem 0;
  }
  .subtitle {
    font-size: 0.75rem;
  }
  .head {
    margin: 0 1rem;
    position: relative;
  }
  .panel-list {
    position: relative;
    height: 100%;
  }
  input {
    height: 2rem;
    padding: 0;
  }
  .filter {
    padding: 0 0.5rem;
    background-color: theme.$dark-blue;
  }
  .nav-wrap {
    height: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center; 
    margin: 1rem 1rem;
  }
  .lists {
    display: grid; 
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    // overflow-y: scroll;
    padding: 0 1rem;
    & > * {
      margin: 0 0;
    }
    max-width: 786px;
  }
  .onboarding-wrap {
    margin: 1rem 1rem;
  }
  .element-content {
    max-width: 600px;
    padding-right: 1rem;
  }
</style>
