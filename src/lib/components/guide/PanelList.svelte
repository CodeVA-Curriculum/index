<script lang='ts'>
  import TutorialListItem from '$lib/components/guide/TutorialListItem.svelte'
  import ProjectListItem from '$lib/components/guide/ProjectListItem.svelte'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { faX } from '@fortawesome/free-solid-svg-icons'
  let { title, list, children } = $props()
  const items = {
    "Projects": ProjectListItem,
    "Tutorials": TutorialListItem
  }
  // const Component = ProjectListItem
  // let Component = $derived.by(() => items[title])
  let selected = $derived.by(() => list.filter((obj) => {
    return obj.selected
  }))
</script>

<div class='panel-list'>
  <div class='close'>{@render children?.()}</div>
  <div class='head'>
  <h2>{title}</h2>
  <fieldset role="group">
    <input type="text">
    <input class='filter' type='button' value="Filters">
  </fieldset>
  </div>
  {#if selected.length > 0}
  <ul class='selected'>
    {#each selected as item}
      <ProjectListItem map={true} obj={item} />
    {/each}
  </ul>
  {/if}
  <hr>
  <ul>
    {#each list as item}
      <ProjectListItem map={true} obj={item} />
    {/each}
  </ul>
</div>

<style lang='scss'>
  @import "$lib/styles/theme.scss";
  .panel-list {
    padding: 1rem;
  }
  input {
  height: 2rem;
  padding: 0;
  }
  .filter {
  padding: 0 0.5rem;
    background-color: $dark-blue;
  }
  .close{ position: absolute; right: 0; top: 0;}
  ul {
    overflow-y: scroll;
    & > * {
      margin: 0;
      padding: 0;
    }
  }
</style>
