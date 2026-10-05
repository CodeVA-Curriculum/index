<script lang='ts'>
  let { url } = $props()
</script>

<svelte:options customElement={{
    tag: 'pdf-viewer',
    shadow: 'none'
}} />

{#snippet document(url)}
    <div id="pdf" class='doc-wrap'>
      <object type="application/pdf" data="{url}">
        <embed src="{url}" type="application/pdf" >
      </object>
    </div>
{/snippet}

<div class='pdf-viewer'>
  {@render document(url)}
</div>
<style lang='scss'>
  object, embed {
    width: 100%;
  }
  .doc-wrap {
    margin: 2rem 0;
  }
</style>
