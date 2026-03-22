<script lang='ts'>
  import { ElementType } from '$lib/components/guide/DetailsIcons.svelte'
  import Video from '$lib/components/Video.svelte'
  import DetailsIcons from '$lib/components/guide/DetailsIcons.svelte'
  import NodeView from '$lib/components/guide/NodeView.svelte'
  import ProjectDetailsAccordion from '$lib/components/guide/ProjectDetailsAccordion.svelte'
  import TutorialListItem from '$lib/components/guide/TutorialListItem.svelte'
  import Minimap from '$lib/components/guide/Minimap.svelte'

  let { obj } = $props()
</script>
<div class='project-view'>
  <aside>
    <header>
      <details class='nomark'>
        <summary>
          <h1>{obj.db.title}</h1>
          <DetailsIcons eltype={ElementType.Project} />
        </summary>
        <Video />
        <p class='description'>{@html obj.db.description}</p>
        <hr>
      </details>
    </header>
    <main>
      <Minimap />
      <div class='selected-node'>
        <p>Click to load the first tutorial!</p>
      </div>
      <!-- <TutorialListItem /> -->
      <details>
        <summary>Browse All # Tutorials</summary>
      </details>
      <h2>Next Up</h2>
      <div class='buttons'>
        <a role="button">node.title</a>
        <a role="button">node.title</a>
        <a class="optional" role="button">node.title optional</a>
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
    padding: 3rem;
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
