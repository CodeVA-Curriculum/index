<script lang='ts'>
  import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
</script>

<span><Fa size=.9x icon={faCircleQuestion} />
<div class='tooltip'>
  <span>A Lesson Plan is one continuous learning experience, usually about 1 hour of instruction. Some are longer, spreading instruction out over several hours or class periods. Check the lesson details for an estimate of lesson duration.</span>
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
