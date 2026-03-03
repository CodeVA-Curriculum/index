<script lang='ts'>
  import PanelList from '$lib/components/guide/PanelList.svelte'
  import Fa from 'svelte-fa'
  import { faX } from "@fortawesome/free-solid-svg-icons"
  import type { PageProps } from './$types'
  let { data }:PageProps = $props()

  let panelOpen:string|false = $state('projects')
  const panel = {
    projects: {
      title: 'Projects',
      objs: data.guide.projects
    },
    tutorials: {
      title: 'Tutorials',
      objs: data.guide.nodes
    }
  }
  function toggle(title:string) {
    panelOpen = title ? title : false;
    
  }
</script>

<div class='map-view'>
<div class='ui {panelOpen ? 'open': 'closed'}'>
  <div class='start'>
    <button onclick={() => toggle('projects')}>projects</button>
    <button onclick={() => toggle('tutorials')}>tutorials</button>
    <button>backpack</button>
  </div>
  <div class='end'>
    <button>export</button>
    <button>import</button>
  </div>
</div>
<div class='panel {panelOpen ? 'open': 'closed'}'>
  <div class='body {panelOpen ? 'open': 'closed'}'>
    {#if panelOpen}
      <PanelList panel={panel[panelOpen]} >
        <button class='close' onclick={() => toggle()}><Fa icon={faX} /></button>
      </PanelList>
    {/if}
  </div>
</div>
</div>


<style lang='scss'>
  .panel {
    // position: absolute; top: 4.25rem;
    height: 100%;
    &.open { width: 30rem; }
    &.closed { width: 0rem; }
    // -webkit-transition: width 0.25s ease-in-out;
    // -moz-transition: width 0.25s ease-in-out;
    // -o-transition: width 0.25s ease-in-out;
    // transition: width 0.25s ease-in-out;
    overflow-y: scroll;
    // &.closed { width: 0; }
    // &.open { width: auto; }
    // z-index: 99;
    box-shadow: 5px 5px 5px 0px grey;
    z-index: 98;
  }
  .body {
    width: 100%;
    position: relative;
    background-color: pink;
  }
  .ui {
    height: 90%;
    position: fixed;
    top: 4.25rem;
    left: 1.25rem;
    display: flex;
    flex-direction: column;
    .start {
      flex: 1;
      display: flex; flex-direction: column;
      background-color: lightgreen;
      justify-content: start;
    }
    .end {
      flex: 1;
      display: flex; flex-direction: column;
      background-color: pink;
      justify-content: end;
    }
    button {
      margin: 1rem 0;
    }
    // .open { z-index: -99; }
    // .closed { z-index: 99; }
  }
  .map-view {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: powderblue;
    width: 100vw;
    overflow-x: hidden;
  }
  .close{ position: absolute; right: 0; top: 0;}
</style>
