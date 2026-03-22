<script lang='ts'>
  let { id = "14I8C6FKINQ"} = $props();
</script>
<div class='video'>
  <iframe src='https://www.youtube.com/embed/{id}' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<style lang='scss'>
  .video {
    display: flex;
    width: 100%;
  }
  iframe { border-radius: 12px; aspect-ratio: 16 / 9; width: 100%; }

</style>
