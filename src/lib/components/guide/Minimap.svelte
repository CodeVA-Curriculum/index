<script lang='ts'>
  import InteractiveMap from './InteractiveMap.svelte'
  import { onMount } from 'svelte'
  let { map } = $props()
  onMount(() => {
  })
</script>
<div class='minimap'>
<InteractiveMap interact={false} nodes={[]} edges={[]} />
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
