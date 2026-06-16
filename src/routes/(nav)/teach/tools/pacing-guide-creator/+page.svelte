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
      <p>This tool is designed to help you find opportunities to <strong>integrate computer science</strong> into your curriculum! Follow the instructions below:</p>
        <ol>
          <li>Write a description of a unit in the first row (this can be a single lesson, a series of lessons, a whole semester, whatever)</li>
          <li>Add related standards by clicking "Add". For example, if your unit covers oral language skills in 1st grade, you'd pick the relevant standard from the "Add" menu (1.EL.OL.1, in this case).</li>
          <li>Click "Load Resources" to populate a list of CS activity examples that integrate computing standards with the other standards you selected!</li>
        <p>Use the activity examples in your unit, or reference them for examples and inspiration for your own CS-integrated lessons!</p>
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
