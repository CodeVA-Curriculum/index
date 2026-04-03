<script lang='ts'>
  import NodeView from './NodeView.svelte'
  import ProjectNodeAccordion from './ProjectNodeAccordion.svelte'
  import ProjectListItem from './ProjectListItem.svelte'
  import Minimap from './Minimap.svelte'
  import DetailsIcons from './DetailsIcons.svelte'
  import Video from '$lib/components/Video.svelte'
  import { Map } from './Map.svelte'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  let { map } = $props()
  let mapObj:Map = new Map(map)
  let loaded:boolean = $state(false)
  const p = $derived.by(() => map.projects[0] )
  let nextUp = $state([])
  let pathParam = $state(null)

  let project = $state()
  onMount(() => {
    loaded = true;
    pathParam = $page.url.searchParams.get("view")
    // let next = project.getNext()
    // nextUp = [...nextUp, ...next]
  })
  $effect(() => {
    pathParam = $page.url.searchParams.get("view")
  })
  const loadMap = new Promise(async (resolve, reject) => {
    await import("./Minimap.svelte")
    resolve(mapObj)
  });

</script>
<div class='project-view'>
  <aside>
    <div class='aside-stick'>
    <header>
      <details class='nomark'>
        <summary>
          <h1>{p.title}</h1>
          <DetailsIcons eltype={0} />
        </summary>
        <Video />
        <p class='description'>{@html p.description}</p>
        <hr>
      </details>
    </header>
    <main>
      {#await loadMap then { default: MiniMap }}
      <Minimap view={pathParam} bind:map={mapObj} />
      <div class='selected-node'>
        {#if pathParam}
        <ProjectListItem obj={mapObj.elementsByPath[pathParam]} />
        {/if}
      </div>
      <h2>Next Up</h2>
      <div class='buttons'>
        {#each mapObj.projects[0].getNext(pathParam ? mapObj.elementsByPath[pathParam].db.path : "default") as res}
          <a class={res.optional ? "optional" : ""} href="?view={res.path}" role="button">{res.title}{#if res.optional}<i>(Optional)</i>{/if}</a>
        {/each}
      </div>
      <div class='nodeGroups'>
        <ProjectNodeAccordion project={mapObj.projects[0]} />
      </div>
      {/await}
    </main>
    </div>
  </aside>
  <main class='container nodeview'>
    {#if pathParam && mapObj}
    <nav aria-label="breadcrumb">
      <ul>
        <li>{mapObj.projects[0].db.title}</li>
        <li>{mapObj.elementsByPath[pathParam].db.title}</li>
      </ul>
    </nav>
    {/if}
    <section class="">
      {#if mapObj && pathParam}
      <NodeView obj={mapObj.elementsByPath[pathParam]} />
      {/if}
    </section>
  </main>
</div>
<style lang='scss'>
  @import "$lib/styles/theme.scss";
  nav { margin-top: 0.5rem;}
  h2 { margin-top: 3rem; }
  .container {
    width: 100%;
  }
  .selected-node {
    border: 3px dashed black;
    margin-bottom: 1rem;
    & > * { margin: 0; padding: 0; text-align: center; }
  }
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    & > .optional {
      background-color: whitesmoke;
      color: $text;
      border: 3px dashed black;
    }
  }
  .project-view { display: flex;
    width: 100%;
    position: absolute;
    flex-direction: row;
    // background-color: powderblue;
  }
  .stats { background-color: lightblue;
    margin: 1rem 0;
  }
  .aside-stick {
    top: 0;
    position: sticky;
    overflow-y: scroll;
    padding: 1rem;     
    height: 100vh;
  }
  aside {
    box-shadow: 5px 5px 5px 0px grey;
    min-width: 24rem;
    border: 1px solid whitesmoke;
    position: relative;
    // height: 100%;
  }
  details.nomark > summary::after {
    display: none;
  }
  .description { margin-top: 1rem; }
  a.optional {
    background-color: white;
    border: 3px dashed black;
    i {
      padding-left: 0.5rem;
    }
  }
  hr { margin-bottom: 4rem; }
  .nodeview {
    padding: 0 4rem;
  }
</style>
