<script lang='ts'>
  import Dismiss from '$lib/components/Dismiss.svelte'
  import PacingGuide from '$lib/components/pacing-guide/PacingGuide.svelte'
  let { data, form } = $props()

</script>
<div class='pacing-guide' >
<div class='container'>
  <section>
    <Dismiss>
      <h1>Pacing Guide Creator</h1>
      <p>Lorem ipsum</p>
    </Dismiss>
  </section>
  <section>
    <PacingGuide form={form} standardsMenu={data.map} standards={data.standards} elements={data.elements} />
  </section>
</div>
</div>
<style lang='scss'>
  .pacing-guide {
    position: relative;
    height: 100%;
  }
</style>
