<script lang='ts'>
  import DetailsIcons from '$lib/components/guide/DetailsIcons.svelte'
  import { onMount } from 'svelte'
  import { getContext } from 'svelte'
  import { page } from '$app/stores'
  import CompactTutorialListItem from '$lib/components/guide/CompactTutorialListItem.svelte'
  import Fa from 'svelte-fa'
  import { faFire, faLocationDot, faCheck } from '@fortawesome/free-solid-svg-icons'
  import { ElementType } from './DetailsIcons.svelte'

  let { obj, map = false, close } = $props()
  let objType = $derived("nodeGroups" in obj ? ElementType.Project : ElementType.Tutorial)
  let noun = $derived(objType == ElementType.Project ? "Project":"Tutorial")

  function toggle() {}
  let param = obj.db.path
  let mapBase = `/learn/${obj.db.path.substring(0, obj.db.path.indexOf('/'))}`
  let titleLink = map ? `${mapBase}?view=${param}` : `/learn/${obj.db.path}`
</script>

<article class='card'>
    <heading class='card-heading'>
      <a href={titleLink}><p>{obj.db.title}</p></a>
      <div>
        <DetailsIcons eltype={objType} />
      </div>
    </heading>
    <p>{obj.db.short ? obj.db.short : "No short description provided!"}</p>
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
      <a href={titleLink} class='select' role="button">Select in Map</a>
      {/if}
      <a href="/learn/{obj.db.path}" role="button">Open {noun}</a>
      <a role="button">Save {noun}</a>
      {@render close?.()}
    </footer>
</article>

<style lang='scss'>
  @import "$lib/styles/theme.scss";
  details.nomark > summary::after {
    display: none;
  }
  article {
    max-width: 40rem;
    margin-bottom: 0;
  }
  article > p {
    margin-top: 1rem;
  }
  heading {
    & > span { margin-left: 1rem;}
    & p {
      font-family: Poppins;
      font-weight: bold;
      font-size: 18pt;
      margin: 0;
      color: $text;
      &:hover { text-decoration: underline; }
    }
    & a {
      padding: 0;
      color: $text;
      margin: 0;
      text-decoration: none;
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
