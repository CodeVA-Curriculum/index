<script lang='ts'>
  import { onMount } from 'svelte'
  import { getContext } from 'svelte'
  import type { Project } from '$lib/components/guide/Project.svelte'
  import CompactTutorialListItem from '$lib/components/guide/CompactTutorialListItem.svelte'
  import Fa from 'svelte-fa'
  import { faFire, faLocationDot, faCheck } from '@fortawesome/free-solid-svg-icons'
  let { obj} = $props()

  function toggle() {}

</script>

<article class='card'>
  <div class='card-body'>
    <heading class='card-heading'>
    <h3>
      <span>{obj.title}</span>
    </h3>
    {#if false}<span><Fa size="1x" icon={faCheck} /></span>{/if}
    </heading>
    <p class='icons'>
      <span><Fa icon={faFire} /> {obj.difficulty}</span>
    </p>
    <p>{obj.short ? obj.short : "No short description provided!"}</p>
    {#each Object.entries(obj.nodeGroups) as [k,v]}
    <details>
      <summary><Fa icon={faLocationDot} /> {v.length} tutorials</summary>
      <ol class='nodelist'>
        {#each v as node}
        <li>
          <CompactTutorialListItem node={node} />
        </li>
        {/each}
      </ol>
    </details>
    {/each}
    <hr>
    <a class='select' role="button">Select in Map</a>
    <a href="/learn/{obj.path}" role="button">Open Project</a>
    <a role="button">Save Project</a>
    <a role="button" onclick={toggle}>Mark Complete</a>
  </div>
</article>

<style lang='scss'>
  heading {
    display: flex;
    flex-direction: row;
    & > span { margin-left: 1rem;}
  }
  details {
    font-size: 14pt;
  }
  .card-body {
    position: relative;
  }
  @import "$lib/styles/theme.scss";
  a {
    background-color: white;
    color: $text;
    &.select { background-color: $dark-blue; color: white;  }
  }
  h3 {
    font-size: 18pt;
  }
  a {
    padding: 10px;
    font-size: $small;
  }
  .icons { position: absolute; top: 0; right: -6px;
    & > span {
    // border: 1px solid grey;
    border-radius: 24px;
    padding: 8px;
    padding-bottom: 6px;
    }
  }
  .number-pill {
    display: inline-flex;
    background-color: lightgray;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    font-weight: bold;
    margin: 0 0.5rem;
  }
  .nodelist > li {
    list-style: none;
  }
</style>
