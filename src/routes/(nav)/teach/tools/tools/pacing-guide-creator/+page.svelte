<script lang='ts'>
  import type { PageProps } from './$types';
  import PacingGuide from "$lib/components/pacing-guide/PacingGuide.svelte"
    import { onMount } from "svelte";

    let { data }:PageProps = $props()

  // onMount(() => {
  //   console.log(data)
  // })
</script>
<div class='container'>
  <section>
    <article>
      <h1>Pacing Guide Creator</h1>
      <div class='grid'>
        <div class='content'>
      
      <p>To use this tool, create one row per unit or lesson you are planning. Then, select the standards you hope to align to for each row. The tool will look at the standards you select and find lessons that match the SOLs you selected to relevant CS-integrated activities!</p>
      <p>For now this tool only works with the Virginia Standards of Learning. We are always adding new material and making improvements to the site--please reach out to <a href="mailto:jonstapleton@codevirginia.org">jonstapleton@codevirginia.org</a> if you have any requests or would like to report a bug. Stay tuned for more lessons and additional support for national standards coming soon!</p>
      </div>
      <div class='video'>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/DvvHpnTBlkw?si=ScwIr-2oocPFeoJg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    </article>
  </section>
  <section>
    <PacingGuide elements={data} />
  </section>
</div>

<style lang='scss'>
  iframe {
    border-radius: 12px;
  }
</style>