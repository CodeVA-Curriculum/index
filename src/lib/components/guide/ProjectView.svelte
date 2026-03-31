<script lang='ts'>
  import ProjectListItem from './ProjectListItem.svelte'
  import Minimap from './Minimap.svelte'
  import DetailsIcons from './DetailsIcons.svelte'
  import Video from '$lib/components/Video.svelte'
  import { Map } from './Map.svelte'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  let { map } = $props()
  const minimap = new Map(map)
  let loaded:boolean = $state(false)
  let selectedGroup = $state(0)
  let selectedNode = $state(0)
  const params = $page.url.searchParams
  const p = minimap.projects[0]
  let nextUp = $state([])
  const pathParam = $page.url.searchParams.get("view")
  const project = minimap.projects[0]
  onMount(() => {
    loaded = true;
    let next = project.getNext()
    nextUp = [...nextUp, ...next]
  })

</script>
<div class='project-view'>
  <aside>
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
      <Minimap map={minimap} />
      <div class='selected-node'>
      </div>
      <!-- <TutorialListItem /> -->
      <details>
        <summary>Browse All # Tutorials</summary>
      </details>
      <h2>Next Up</h2>
      <div class='buttons'>
        {#each nextUp as path}
          <a role="button">{minimap.elementsByPath[path].db.title}</a>
        {/each}
      </div>
    </main>
  </aside>
  <main class='container'>
    <nav aria-label="breadcrumb">
      <ul>
        <li>project.title</li>
        <li>node.title</li>
      </ul>
    </nav>
    <section>
      Node view
    </section>
  </main>
</div>
<style lang='scss'>
  @import "$lib/styles/theme.scss";
  nav { margin-top: 0.5rem;}
  h2 { margin-top: 3rem; }
  .container {
    width: 100%;
    margin: 0 4rem;
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
    height: 100vh;
    // background-color: powderblue;
    overflow-y: hidden;
  }
  .stats { background-color: lightblue;
    margin: 1rem 0;
  }
  aside {
    box-shadow: 5px 5px 5px 0px grey;
    min-width: 24rem;
    border: 1px solid whitesmoke;
    padding: 1rem;     
    overflow-y: scroll;
  }
  details.nomark > summary::after {
    display: none;
  }
  .description { margin-top: 1rem; }
  hr { margin-bottom: 4rem; }
</style>
