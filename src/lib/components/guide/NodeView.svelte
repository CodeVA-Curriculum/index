<script lang='ts'>
  import DetailsIcons from '$lib/components/guide/DetailsIcons.svelte'
  import { ElementType } from '$lib/components/guide/DetailsIcons.svelte'
  import Video from '$lib/components/Video.svelte'
  let { obj } = $props()
</script>
<div class='nodeview'>
  <header>
    <div class='video-wrap'>
      <Video id={"14I8C6FKINQ"} />
    </div>
    <div class='info'>
      <h1>{obj.db.title}</h1>
      <DetailsIcons eltype={ElementType.Tutorial} />
      <p>{obj.db.description}</p>
    </div>
  </header>
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
