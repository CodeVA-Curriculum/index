<script lang='ts'>
  import ProjectListItem from '$lib/components/guide/ProjectListItem.svelte'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { faX } from '@fortawesome/free-solid-svg-icons'
  let { panel, children } = $props()
  onMount(() => {
    console.log(panel)
  })
</script>

<div class='panel-list'>
  <div class='close'>{@render children?.()}</div>
  <div class='head'>
  <h2>{panel.title}</h2>
  <fieldset role="group">
    <input type="text">
    <input class='filter' type='button' value="Filters">
  </fieldset>
  </div>
  <ul>
    {#each panel.objs as project}
      <ProjectListItem obj={project} />
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
