<script lang='ts'>
  import InteractiveMap from './InteractiveMap.svelte'
  let { map, view, selected = $bindable([]) } = $props()
  let interact = $state(false)
</script>
<div class='minimap' onmouseenter={() => interact = true} onmouseleave={() => interact=false}>
<InteractiveMap bind:selected interact={interact} view={view} {...map} map={map} height={248} width={248*(16/9)} />
</div>
<dialog>
  <article>
    <header>
      <button aria-label="Close" rel="prev"></button>
    </header>
  </article>
</dialog>

<style lang='scss'>
  .minimap {
    border: 1px solid black;
    margin: 1rem 0;
    aspect-ratio: 16/9;
    height: 248px;
    overflow-x: hidden;
  }
</style>
