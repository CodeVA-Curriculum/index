<script lang='ts'>
  let { content, boxed = false } = $props()
</script>
<svelte:options customElement={{
    tag: 'quick-take',
    shadow: 'none'
}} />

<div class='has-shadow {boxed? "boxed":""}'>
  <div class='quicktake'>
  {@html content}
  </div>
</div>
<style lang='scss'>
  .boxed {
    background-color: whitesmoke;
    border-radius: 1rem;
    padding: 1rem;
    margin: 1rem 0;
    position: relative;
  }
</style>
