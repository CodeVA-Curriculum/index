<script lang='ts'>
  let { content, boxed = false } = $props()
</script>
<svelte:options customElement={{
    tag: 'quick-take',
    shadow: 'none'
}} />

<div class='{boxed? "boxed":""}'>
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
    border: 1px solid black;
    position: relative;
  }
</style>
