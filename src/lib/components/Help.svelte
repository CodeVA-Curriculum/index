<script lang='ts'>
  import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  let { children } = $props();
</script>

<span><Fa size=.9x icon={faCircleQuestion} />
<div class='tooltip'>
  <span>{@render children()}</span>
</div>
</span>

<style lang='scss'>
  .tooltip {
    visibility: hidden;
    position: absolute;
    bottom: 36px;
    left: calc(-100px + 0.25rem); 
    line-height: 120%;
    width: 200px;
    padding: 8px;
    font-size: medium;
    border-radius: 8px;
    background-color: gray;
  }
  span {
    position: relative;
    &:hover {
      .tooltip { visibility: visible; }
    }
  }
</style>
