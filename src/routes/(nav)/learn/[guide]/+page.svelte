<script lang='ts'>
  import Capture from '$lib/components/Capture.svelte'
  import InteractiveMap from '$lib/components/guide/InteractiveMap.svelte'
  import { page } from '$app/stores'
  import GuideNav from '$lib/components/guide/GuideNav.svelte'
  import ProjectListItem from '$lib/components/guide/ProjectListItem.svelte'
  import PanelList from '$lib/components/guide/PanelList.svelte'
  import Fa from 'svelte-fa'
  import { faX } from "@fortawesome/free-solid-svg-icons"
  import type { PageProps } from './$types'
  let { data }:PageProps = $props()
  import { Map } from '$lib/components/guide/Map.svelte'

  const params = $page.url.searchParams

  const map = new Map(data.guide)
  let interactable = $state(true)
  function handleCapture(flag:boolean) {
    interactable = flag
    console.log("Capture bump")
  }

  let panelOpen:string|false = $state('')
  let selected = $state([])
  const lists = {
    Projects: map.projects,
    Tutorials: map.nodes,
    Selected: selected
  }
  let workingList:Project[]|Node[] = $state(map.projects)
  function toggle(title:string) {
    panelOpen = title ? title : false;
    workingList = lists[title]
  }
</script>

<GuideNav guide={data.guide} session={data.session} />

<div class='map-view'>
  <div class='map-wrap'>
    <InteractiveMap bind:selected interact={interactable} nodes={map.nodes} edges={map.edges} />
  </div>
  <div class='ui {panelOpen ? 'open': 'closed'}'>
    <div class='start'>
      <Capture on:capture={(e) => handleCapture(e.detail)}>
        <button onclick={() => toggle('Projects')}>projects</button>
        <button onclick={() => toggle('Tutorials')}>tutorials</button>
        <button onclick={() => toggle('Selected')}>selected {selected.length}</button>
        <button>backpack</button>
      </Capture>
    </div>
    <div class='end'>
      <Capture on:capture={(e) => handleCapture(e.detail)}>
        <button>export</button>
        <button>import</button>
      </Capture>
    </div>
  </div>
  <div class='panel {panelOpen ? 'open': 'closed'}'>
    <div class='body {panelOpen ? 'open': 'closed'}'>
      {#if panelOpen}
        <Capture on:capture={(e) => handleCapture(e.detail)}>
          <PanelList title={panelOpen} list={workingList}>
            <button class='close' onclick={() => toggle(false)}><Fa icon={faX} /></button>
          </PanelList>
        </Capture>
      {/if}
    </div>
  </div>
</div>


<style lang='scss'>
  @import "$lib/styles/theme.scss";
  .map-wrap {
    position: absolute;
    // background-color: pink;
    width: 100%;
    height: 100%;
    // z-index: -1;
    // width: 100vw;
  }
  .panel {
    // z-index: 99;
    // position: absolute; top: 4.25rem;
    height: 100%;
    &.open { width: 30rem; }
    &.closed { width: 0rem; }
    position: absolute;
    -webkit-transition: width 0.25s ease-in-out;
    -moz-transition: width 0.25s ease-in-out;
    -o-transition: width 0.25s ease-in-out;
    transition: width 0.25s ease-in-out;
    overflow-y: scroll;
    // &.closed { width: 0; }
    // &.open { width: auto; }
    // z-index: 99;
    box-shadow: 5px 5px 5px 0px grey;
    z-index: 98;
    background-color: white;
  }
  .body {
    width: 100%;
    position: relative;
    // background-color: white;
  }
  .ui {
    height: 100%;
    position: relative;
    // position: fixed;
    // top: 4.25rem;
    // left: 1.25rem;
    width: 8rem;
    display: flex;
    flex-direction: column;
    .start {
      flex: 1;
      display: flex; flex-direction: column;
      // background-color: lightgreen;
      justify-content: start;
    }
    .end {
      flex: 1;
      display: flex; flex-direction: column;
      // background-color: pink;
      justify-content: end;
    }
    button {
      margin: 1rem 1rem;
    }
    // .open { z-index: -99; }
    // .closed { z-index: 99; }
  }
  .map-view {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    // background-color: powderblue;
    width: 100vw;
    overflow-x: hidden;
  }
  .close{ position: absolute; right: 0; top: 0; background-color: transparent; border: none; color: $text }
</style>
