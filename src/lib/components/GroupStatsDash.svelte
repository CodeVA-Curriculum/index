<script lang='ts'>
  import TrailGuideProjectGradebook from '$lib/components/guide/TrailGuideProjectGradebook.svelte'
  import TrailGuideNodeGradebook from '$lib/components/guide/TrailGuideNodeGradebook.svelte'
  import Pill from '$lib/components/Pill.svelte'
  import Fa from 'svelte-fa'
  import { faRoute, faLocationDot, faX } from '@fortawesome/free-solid-svg-icons'
  import { page } from '$app/state'
  let { users, guides, children } = $props()

  let selectedGuide = $derived(page.url.searchParams.get('dashboard'))
  let status = $state(false)
  let chart = $state('projects')
  let dropdown;
  let dropdownLabel = $derived.by(() => {
    const [ guide ]  = guides.filter((g) => g.path.replace('/meta.md', '') == selectedGuide)
    return guide ? guide.title : 'Select a guide..'
  })
  let selectedGuideObj = $derived.by(() => {
    const [ guide ]  = guides.filter((g) => g.path.replace('/meta.md', '') == selectedGuide)
    return guide
  })

  function toggle() {
    dropdown.open = !dropdown.open
  }
</script>

<article>
  <header>
    <div class='dropdown-wrap'>
      <details bind:this={dropdown} class="dropdown" >
        <summary role="button" class='secondary'>
          {dropdownLabel}
        </summary>
        <ul>
          {#each guides as guide}
            <li><a onclick={toggle} href="?dashboard={guide.path.replace('/meta.md', '')}" class='item'>{guide.title} <Pill style='small'>{guide.userCount}</Pill></a></li>
          {/each}
        </ul>
      </details>
    </div>
    <div class='label'>
      <button onclick={() => chart = 'projects'} class="with-icon {chart == 'projects' ? 'select' : 'deselect'}">Projects <span><Fa icon={faRoute} /></span></button>
      <button onclick={() => chart = 'tutorials'} class="with-icon {chart == 'tutorials' ? 'select' : 'deselect'}">Tutorials<span><Fa icon={faLocationDot} /></span></button>
      <a role='button' class='close with-icon' href="?">Close<span><Fa icon={faX} /></span></a>
    </div>
  </header>
  <div>
    {#if selectedGuideObj}
      {#if chart == 'projects'}
        <TrailGuideProjectGradebook users={users} guide={selectedGuideObj} />
      {:else if chart == 'tutorials'}
        <TrailGuideNodeGradebook users={users} guide={selectedGuideObj} />
      {/if}
    {:else}
      {@render children?.()}
    {/if}
  </div>
</article>

<style lang='scss'>
  @use '$lib/styles/layout.scss';
  @use '$lib/styles/theme.scss';
  article {
    margin: 2rem 0;
  }
header {
  gap: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
details, summary {
  margin: 0;
}
.item:hover {
  cursor: pointer;
}
.label {
  @extend .tabs;
}
.close {
  margin-left: 12px;
  background-color: transparent;
  color: theme.$text;
  border-color: transparent;
}
</style>
