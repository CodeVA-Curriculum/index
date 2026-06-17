<script lang='ts'>
  import QuickTake from '$lib/components/guide/QuickTake.svelte'
  import DetailsIcons from '$lib/components/guide/DetailsIcons.svelte'
  import { ElementType } from '$lib/components/guide/DetailsIcons.svelte'
  import Video from '$lib/components/Video.svelte'
 import CodeAndImage from '$lib/components/guide/CodeAndImage.svelte'
  let { obj } = $props()
</script>
<div class='nodeview'>
  <header>
    {#if obj.db.video}
    <div class='video-wrap'>
      <Video id={obj.db.video} />
    </div>
    {/if}
    <div class='info'>
      <h1>{obj.db.title}</h1>
      <DetailsIcons eltype={ElementType.Tutorial} obj={obj} />
      <p>{obj.db.description}</p>
    </div>
  </header>
  <QuickTake boxed content={obj.db.quickTake} />
  <hr>
  <main>
    <section>
      {@html obj.db.content}
    </section>
  </main>
</div>
<style lang='scss'>
  main {
    margin-top: 8rem;
  }
  .info > p {
    margin-top: 1rem;
  }
  .nodeview{
    width: 100%;
  }
  .nodeview > header {
    margin-top: 3rem;
    display: flex;
    gap: 3rem;
    flex-direction: row;
    & > * {
      flex: 1;
    }
  }
</style>
