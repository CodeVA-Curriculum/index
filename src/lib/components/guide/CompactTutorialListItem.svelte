<script lang='ts'>
  import Fa from 'svelte-fa'
  import { faCircleDot} from '@fortawesome/free-solid-svg-icons'
  let { node } = $props()
</script>

<li>
  <input type='checkbox'>
  <span>{node}</span>
</li>

<style lang='scss'>
  li {
    list-style: none;
  }
</style>
