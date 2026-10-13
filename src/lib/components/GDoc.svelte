<script lang='ts'>
  let { url } = $props()
  console.log(url)
</script>



<div class='gdoc-viewer'>
  {#if url}
  <iframe src="{url}?embedded=true" width="100%">Failed to load Google Doc</iframe>
  {:else}
  <article>
  <p>Something went wrong! Could not load document.</p>
  </article>
  {/if}
</div>
<style lang='scss'>
  .gdoc-viewer {
    flex: 2 1;
  }
  iframe {
    width: 100%;
    aspect-ratio: 8.5 / 11;
  }
</style>
