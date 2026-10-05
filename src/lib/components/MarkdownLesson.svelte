<script lang='ts'>
  import PDF from '$lib/components/PDF.svelte'
  let { obj } = $props()
  const materials = JSON.parse(obj.materials)
</script>
{#snippet document(url)}
    <div id="pdf" class='doc-wrap'>
      <object type="application/pdf" data="{url}">
        <embed src="{url}" type="application/pdf" >
      </object>
    </div>
{/snippet}

<div class='markdown-lesson'>
{@html obj.content}
</div>
<div class='materials'>
  {#each materials as material}
    {@render document(material)}
  {/each}
</div>

<style lang='scss'>
  $PAGE_MARGIN: 3rem;
  .markdown-lesson {
    background-color: white;
    // border: 1px solid black;
    padding: $PAGE_MARGIN;
    box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),   /* Sharp edge shadow */
    0 4px 12px rgba(0, 0, 0, 0.05),  /* Soft mid-distance shadow */
    0 12px 24px rgba(0, 0, 0, 0.03); /* Deep ambient fade */

  border: 1px solid rgba(0, 0, 0, 0.13);
  }
  .doc-wrap {
    width: 100%;
    margin: 2rem 0;
  }
  object, embed {
    margin: 0 0;
    width: 100%;
    z-index: -99;
    height: 128vh;
  }
  .material { position: relative; }
  
  .material::before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
  }
</style>
