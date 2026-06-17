<script lang='ts'>
  let { content } = $props()
</script>
<svelte:options customElement={{
    tag: 'quick-take',
    shadow: 'none'
}} />

<div class='quicktake'>
  {@html content}
</div>
<style lang='scss'>
  .children {
    background-color: pink;
  }
  .img-wrap {
    background-color: blue;
  }
</style>
