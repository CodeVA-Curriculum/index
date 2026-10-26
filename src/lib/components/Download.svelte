<script lang='ts'>
  import Fa from 'svelte-fa'
  import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
  let { file, title } = $props()

</script>
<svelte:options customElement={{
    tag: 'download-link',
    shadow: 'none'
}} />

<a class='download-link' href={file} download>{ title }<span><Fa icon={faArrowDown} /></a>

<style lang='scss'>
  @use "$lib/styles/theme.scss";
  $HOVER_PAD: 8px;
  $X_PAD: 8px;
  span {
    padding: 0 $X_PAD;
  }
  a {
    padding: $HOVER_PAD;
    margin: -$HOVER_PAD;
    position: relative;
    border-radius: $HOVER_PAD * 2;
  }:hover {
    border: 4px solid whitesmoke;
    background-color: white;
    z-index: 99;
    left: $HOVER_PAD / -2;
  }
</style>
