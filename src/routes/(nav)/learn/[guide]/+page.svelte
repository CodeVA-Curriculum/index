<script lang='ts'>
  import Capture from '$lib/components/Capture.svelte'
  import InteractiveMap from '$lib/components/guide/InteractiveMap.svelte'
  import { page } from '$app/state'
  import { goto } from '$app/navigation'
  import GuideNav from '$lib/components/guide/GuideNav.svelte'
  import ProjectListItem from '$lib/components/guide/ProjectListItem.svelte'
  import PanelList from '$lib/components/guide/PanelList.svelte'
  import Fa from 'svelte-fa'
  import { faX, faCircleInfo, faRoute, faLocationDot } from "@fortawesome/free-solid-svg-icons"
  import type { PageProps } from './$types'
  let { data }:PageProps = $props()
  import { Map } from '$lib/components/guide/Map.svelte'
  import { onMount } from 'svelte'



  let map = $state(false)
  let interactable = $state(true)
  function handleCapture(flag:boolean) {
    interactable = flag
  }

  let panelOpen = $state(null)
  let firstLoad = $state(false)
  onMount(() => {
    map = new Map(data.guide)
    // if(data.guide.start) {
    //   page.url.searchParams.set('view', data.guide.start.path);
    //   goto(page.url.toString(), { 
    //     keepFocus: true, // Prevents losing input focus if user is typing
    //     noScroll: true   // Prevents the page from jumping back to the top
    //   });
    //   firstLoad=true
    // }
  })
  $effect(() => {
    panelOpen = page.url.searchParams.get('view')    
  })
  let selected = $state([])
  let hoverList = $state([])
  const lists = {
    Projects: map.projects,
    Tutorials: map.nodes,
    Selected: [ ]
  }
  function toggle(title:string) {
    panelOpen = title ? title : false;
    console.log(selected)
    if(!title) {
      hoverList = []
      for(const el of selected) {
        el.setSelect(false)
      }
      selected = []
    }
  }
</script>

{#snippet displayList(list:(Node|Project)[])}
  {#each list as item}
    <ProjectListItem map={true} obj={item} />
  {/each}
{/snippet}

<GuideNav guide={data.guide} session={data.session} user={data.user} />

<div class='map-view'>
  <div class='map-wrap'>
    {#if map}
    <InteractiveMap legend={true} startPath={data.guide.start.path}  map={map} view={panelOpen} bind:hoverList bind:selected interact={interactable} {...map} />
    {/if}
  </div>
  <div class="ui {panelOpen ? 'open': 'closed'}">
    <div class='start'>
      <Capture on:capture={(e) => handleCapture(e.detail)}>
        <a href="?view=projects" role="button"><span><Fa icon={faRoute} /></span>Projects</a>
        <a href="?view=tutorials" role="button"><span><Fa icon={faLocationDot} /></span>Tutorials</a>
      </Capture>
    </div>
    <div class='end'>
      <Capture on:capture={(e) => handleCapture(e.detail)}>
        <a href="?view=onboarding" class='secondary' role="button"><span><Fa icon={faCircleInfo} /></span> Help</a>
      </Capture>
    </div>
  </div>
  <div onmouseenter={() => interactable = false} onmouseleave={() => interactable = true} class='panel {panelOpen ? 'open': 'closed'}'>
    <div class='body {panelOpen ? 'open': 'closed'}'>
        <Capture on:capture={(e) => handleCapture(e.detail)}>
          {#if panelOpen}
          <PanelList bind:hoverList title={panelOpen} {map}>
              <a role="button" href="?" class='close' onclick={() => toggle(false)}><Fa icon={faX} /></a>
          </PanelList>
        {/if}
        </Capture>
    </div>
  </div>
</div>


<style lang='scss'>
  @import "$lib/styles/theme.scss";
  .map-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .panel {
    height: 100%;
    &.open { width: 28rem;  }
    &.closed { width: 0rem; }
    position: absolute;
    -webkit-transition: width 0.25s ease-in-out;
    -moz-transition: width 0.25s ease-in-out;
    -o-transition: width 0.25s ease-in-out;
    transition: width 0.25s ease-in-out;
    overflow-y: scroll;
    box-shadow: 5px 5px 5px 0px grey;
    z-index: 98;
    background-color: white;
  }
  .body {
    width: 100%;
    position: relative;
  }
  .ui {
    height: 100%;
    position: relative;
    width: 8rem;
    display: flex;
    flex-direction: column;
    .start {
      flex: 1;
      display: flex; flex-direction: column;
      justify-content: start;
    }
    .end {
      flex: 1;
      display: flex; flex-direction: column;
      justify-content: end;
    }
    a[role="button"], button {
      margin: 1rem 1rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 6px;
    }
  }
  .map-view {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: #f6f6f6;
    width: 100vw;
    overflow-x: hidden;
  }
  .close{ position: absolute; right: 0; top: 0; background-color: transparent; border: none; color: $text }
</style>
