<script lang='ts'>
  import Fa from 'svelte-fa'
  import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
  import Video from '../Video.svelte'
  import { Project } from './Project.svelte'
  let { project } = $props()
  let { nodes, groups } = project.getGroupNodeCount();
</script>

<div class='project-panel'>
  {#if project.db.video || true}
    <div class='video'>
      <Video />
    </div>
  {/if}
  <div class='description'>
    <p>{project.db.long}</p>
  </div>
  <div class='nodeGroups'>
    <details>
      <summary>
        <Fa icon={faLocationDot}/>
        <span>Browse {nodes} tutorials across {groups} group(s)</span>
      </summary>
      {#each project.nodeGroups as group}
      <div class='group'>
        {#if project.nodeGroups.length > 1}
        <p>{group.title.substring(1)}</p>
        {/if}
        <ol>
          {#each group.nodes as node}
          <li><a href="?view={node.db.path}">{node.db.title}</a></li>
          {/each}
        </ol>
      </div>
      {/each}
    </details>
  </div>
  <div class='buttons'>
    <a role="button" href="/learn/{project.db.path}">Open Project</a>
    <a role="button"  href="learn/{project.db.path}">Save Project</a>
  </div>
</div>
<style lang='scss'>
  .buttons {
    display: flex;
    gap: 1rem;
    & > * { flex: 1 1; }
  }
  .project-panel {
    padding: 1rem;
    & > * { margin-bottom: 2rem; }
  }
</style>
