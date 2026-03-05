<script lang='ts'>
  import DetailsIcons from '$lib/components/guide/DetailsIcons.svelte'
  import { ElementType } from '$lib/components/guide/DetailsIcons.svelte'
  import Video from '$lib/components/Video.svelte'
</script>
<div class='nodeview'>
  <header>
    <div class='video-wrap'>
      <Video id={"14I8C6FKINQ"} />
    </div>
    <div class='info'>
      <h1>Node Title</h1>
      <DetailsIcons eltype={ElementType.Tutorial} />
      <p>node.description: lorem ipsum dolor sit amet</p>
    </div>
  </header>
  <main>
    <section>
      {@html '<p>Render node content here</p>'}
    </section>
  </main>
</div>
<style lang='scss'>
  main {
    margin-top: 8rem;
  }
  .nodeview{
    width: 100%;
  }
  .nodeview > header {
    display: flex;
    gap: 3rem;
    flex-direction: row;
    & > * {
      flex: 1;
    }
  }
</style>
