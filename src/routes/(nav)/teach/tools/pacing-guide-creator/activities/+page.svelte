<script lang='ts'>
  import Dismiss from '$lib/components/Dismiss.svelte'

  let { data } = $props()
</script>

<div class='container'>
  <Dismiss>
    <h1>CS Integration Grida</h1>
    <p>This grid shows a birds-eye view of all the activities in our K-8 Pacing Guide Creator Tool. Use the tool to filter by standard and create an interactive pacing guide, or browse all the activities here.</p>
  </Dismiss>
  <section class='grid'>
    <form>
      <fieldset>
        <p>grade dropdown</p>
        <p>subject dropdown</p>
      </fieldset>
    </form>
    <table>
      <thead>
      </thead>
      <tbody>
      </tbody>
    </table>
  </section>
</div>
