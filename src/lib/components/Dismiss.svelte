<script lang='ts'>
  import {faX} from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  let { children, title } = $props()
  let open = $state(true)
</script>
{#if open}
<div class='dismiss'>
  <header>
    <button aria-label="Close" rel="prev" onclick={() => open=false}><Fa icon={faX} size=0.75x  /></button>
  </header>
  {@render children?.()}
</div>
{/if}
<style lang='scss'>
  .dismiss {
    background-color: whitesmoke;
    border-radius: 24px;
    padding: 1rem;
  }
  header { 
    button { background-color: transparent; border: none; color: black }
  }
  button {
    padding: 8px;
    width: 48px;
    height: 48px;
    float: right;
  }
</style>
