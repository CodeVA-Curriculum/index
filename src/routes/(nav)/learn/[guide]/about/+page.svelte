<script lang='ts'>
  let { data } = $props()
</script>

<div class='container'>
  <section>
  <h1>About the Guide</h1>
  {@html data.guide.content}
  </section>
</div>
