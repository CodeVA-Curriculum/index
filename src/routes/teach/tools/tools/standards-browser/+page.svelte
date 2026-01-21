<script lang='ts'>
  import Dismiss from '$lib/components/Dismiss.svelte'
</script>

<div class='container'>
  <section>
    <Dismiss>
      <h1>CS Standards Browser</h1>
      <p>Use this tool to browse, filter, and compare standards of learning from several organizations. Get started by selecting a collection of standards from the dropdown below.</p>
    </Dismiss>
  </section>
  <section>
    <StandardsBrowser />
  </section>
</div>
