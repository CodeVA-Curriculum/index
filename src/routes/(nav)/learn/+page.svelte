<script lang='ts'>
  import GuideListItem from '$lib/components/guide/GuideListItem.svelte'
  import type { PageProps } from './$types'
  let { data }:PageProps = $props();
</script>

<div class='container'>
  <section>
    <h1>Learn Computer Science with Us!</h1>
    <p>Our computing resources are designed for you to use, reuse, and misuse. Check them out!</p>
    <div class='guide-cards'>
      {#each data.guides as guide}
        <GuideListItem  {guide} />
      {/each}
    </div>
  </section>
</div>

<style lang='scss'>
  p { margin-bottom: 2rem; }
  .guide-cards {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 20px;
    flex-basis: 10rem;

  }
</style>
