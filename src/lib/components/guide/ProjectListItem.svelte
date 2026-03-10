<script lang='ts'>
  import DetailsIcons from '$lib/components/guide/DetailsIcons.svelte'
  import { onMount } from 'svelte'
  import { getContext } from 'svelte'
  import CompactTutorialListItem from '$lib/components/guide/CompactTutorialListItem.svelte'
  import Fa from 'svelte-fa'
  import { faFire, faLocationDot, faCheck } from '@fortawesome/free-solid-svg-icons'
  import { ElementType } from './DetailsIcons.svelte'

  let { obj, map = false } = $props()
  let objType = $derived("nodeGroups" in obj ? ElementType.Project : ElementType.Tutorial)
  let noun = $derived(objType == ElementType.Project ? "Project":"Tutorial")

  function toggle() {}

</script>

<article class='card'>
    <heading class='card-heading'>
      <p>{obj.title}</p>
      <div>
        <DetailsIcons eltype={objType} />
      </div>
    </heading>
    <p>{obj.short ? obj.short : "No short description provided!"}</p>
    {#if "nodeGroups" in obj}
    {#each Object.entries(obj.nodeGroups) as [k,v]}
    <details class='nomark'>
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
    {/if}
    <footer>
      {#if map }
      <a class='select' role="button">Select in Map</a>
      {/if}
      <a href="/learn/{obj.path}" role="button">Open {noun}</a>
      <a role="button">Save {noun}</a>
    </footer>
</article>

<style lang='scss'>
  details.nomark > summary::after {
    display: none;
  }
  article {
    max-width: 40rem;
  }
  article > p {
    margin-top: 1rem;
  }
  heading {
    & > span { margin-left: 1rem;}
    & > p {
      font-family: Poppins;
      font-weight: bold;
      font-size: 24pt;
      margin: 0;
    }
    margin-bottom: 0.5rem;
  }
  details {
    font-size: 14pt;
  }
  @import "$lib/styles/theme.scss";
  a {
    background-color: white;
    color: $text;
    &.select { background-color: $dark-blue; color: white;  }
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
