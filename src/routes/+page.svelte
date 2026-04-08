<script lang='ts'>
  import Video from '$lib/components/Video.svelte'
  import Fa from 'svelte-fa'
  import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
</script>
<div class='container main'>
  <section class='video-section'>
    <div>
      <h1>Welcome to the CodeVA Curriculum Hub!</h1>
      <p>This site contains resources, tools, lessons, and other high-quality, thoughtful materials for people learning computing and the people who teach them.</p>
      <a href="/learn" role="button">Explore Coding Resources <span><Fa icon={faArrowRight} /></span></a>
      <a disabled href="/teach/library" role="button">Browse the Lesson Library <span><Fa icon={faArrowRight} /></span></a>
    </div>
    <div>
      <Video id='14I8C6FKINQ' />
    </div>
  </section>
  <section class='is-half video'>
  </section>
</div>

<style lang='scss'>
  a {
    width: 100%;
    margin: 12px 0;
    text-align: left;
    span { float: right; }
  }
</style>
