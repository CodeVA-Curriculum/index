<script lang='ts'>
  let { data } = $props()
</script>

<div class='container'>
  <section>
  <h1>About the {data.guide.title}</h1>
  {@html data.guide.content}
  </section>
</div>
