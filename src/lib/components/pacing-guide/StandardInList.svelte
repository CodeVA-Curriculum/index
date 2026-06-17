<script lang='ts'>
  import Fa from 'svelte-fa'
  import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
  let { selected = $bindable(), obj } = $props()
  let subs = JSON.parse(obj.subs)
  let alpha = "abcdefghijklmnopqrstuvwxyz"

  let selectedIds = $state([])

  function add(obj) {
    selectedIds.push(obj.id)
    selected.push(obj)
    console.log("Add", obj.id)
  }
  function remove(obj) {
    const i = selectedIds.indexOf(obj.id)
    selectedIds.splice(i, 1)
    selected.splice(i, 1)
  }
</script>

<article class='standard-in-list'>
  <header>
    <h4>{obj.abbr}</h4>
    {#if !selectedIds.includes(obj.id)}
      <button onclick={() => add(obj)}><span><Fa icon={faPlus} /></span>Add</button>
    {:else}
      <button onclick={() => remove(obj)}><span><Fa icon={faMinus} /></span>Remove</button>
    {/if}
  </header>
  {@html obj.text}
  <ol>
  {#each subs as sub, i}
    <li>{alpha.charAt(i)}) {@html sub}</li>
  {/each}
  </ol>
</article>
<style lang='scss'>
  header { display: flex; flex-direction: row; align-items: center;
    h4 { flex: 1 0; }
    button { flex: 0 1; padding: 8px 12px; display: inline-block; white-space: nowrap; * { margin-right: 8px; } }
  }
  ol {
    li {
      margin: 4px;
      padding: 0;
    }
  }
</style>
