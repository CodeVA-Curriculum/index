<script lang='ts'>
  let { message, image, link } = $props()
</script>
<svelte:options customElement={{
    tag: 'supporter-callout',
    shadow: 'none'
}} />

<article class='supporter'>
  <div class='img-wrap'>
    <img src={image} />
  </div>
  <p>This resource was created with the generous support of <a href={link}>{message}</a>. Learn more about our partners <a href='https://codevirginia.org/'>our website.</a></p>
</article>

<style lang='scss'>
  .supporter {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
  }
  .img-wrap {
    flex: 0 1;
    min-width: 4rem;
    // aspect-ratio: 1/1;
  }
  img {
    width: 100%;
    // aspect-ratio: 1;
  }
  p { margin-bottom: 0; }
</style>

