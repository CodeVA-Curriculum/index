<script lang='ts'>
  let { project } = $props()
</script>
<div class='minimap'>
  <canvas>Could not load minimap!</canvas>
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
    width: 100%;
    aspect-ratio: 16/9;
  }
</style>
