<script lang='ts'>
  import { goto } from '$app/navigation'
  import Fa from 'svelte-fa'
  import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
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
  const p = $derived.by(() => mapObj.projects[0] )
  let nextUp = $state([])
  let back = $state(null)
  let pathParam = $state(null)

  let project = $state()
  onMount(() => {
    loaded = true;
    pathParam = $page.url.searchParams.get("view")
    nextUp =  mapObj.projects[0].getNext(pathParam ? mapObj.elementsByPath[pathParam].db.path : "default")   // let next = project.getNext()
    let res = mapObj.projects[0].getPrevious(pathParam ? pathParam : "default")
    back = res?.length > 0 ? "?view=" + res : null
    if(!pathParam) { goto('?view=' + nextUp[0].path)}
  })
  $effect(() => {
    pathParam = $page.url.searchParams.get("view")
    nextUp =  mapObj.projects[0].getNext(pathParam ? mapObj.elementsByPath[pathParam].db.path : "default")   // let next = project.getNext()
    let res = mapObj.projects[0].getPrevious(pathParam ? pathParam : "default")
    back = res?.length > 0 ? "?view=" + res : null
  })
  const loadMap = new Promise(async (resolve, reject) => {
    await import("./Minimap.svelte")
    resolve(mapObj)
  });

</script>
<div class='project-view'>
  <aside class='has-shadow'>
    <div class='aside-stick'>
    <header>
      <details class='nomark'>
        <summary>
          <h1>{p.title}</h1>
          <DetailsIcons eltype={0} obj={p} />
        </summary>
        {#if p.video}
        <Video id={p.video}/>
        {/if}
        <p class='description'>{@html p.long}</p>
        <hr>
      </details>
    </header>
    <main>
      {#await loadMap then { default: MiniMap }}
      <Minimap view={pathParam} bind:map={mapObj} />
      <div class='selected-node'>
      {#if back}
        <div><a role="button" href={back}><span><Fa icon={faChevronLeft} /></span></a></div>
      {/if}
        {#if pathParam}
        <ProjectListItem obj={mapObj.elementsByPath[pathParam]} />
        {/if}
        <div><a role="button" disabled={nextUp.length == 0} href="?view={nextUp[0].path}"><span><Fa icon={faChevronRight} /></span></a></div>
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
    display: flex;
    align-items: stretch;
    &  * { display: flex; flex: 1; margin: 0; padding: 0; text-align: center; }
    a {
    color: $text;
      align-items: center;
      padding: 12px;
      background-color: white;
      flex: 0 1;
    }
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
