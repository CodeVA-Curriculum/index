<script lang='ts'>
  import { getContext } from 'svelte'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { faCircleDot, faEnvelope, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
  let { node } = $props()
</script>

<span class='compact-item {{ italic: node.optional }}'>
  <span class='check {{ show: node.obj.complete }}'><Fa icon={faSquareCheck} /></span>
  <span>{node.obj.db.title}</span>
  {#if node.optional}
    <span class='optional'>optional</span>
  {/if}
</span>

<style lang='scss'>
  .compact-item {
    margin-left: -0.5rem;
  }
  .italic{
    font-style: italic;
  }
  
  span.optional {
    background-color: lightgray;
    border-radius: 4px;
    padding: 4px 8px;
    margin: 0 0.5rem;
  }
  .check { margin-right: 0.5rem; visibility: hidden; }
  .show { visibility: normal; }
</style>
