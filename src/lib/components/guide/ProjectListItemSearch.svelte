  <script lang='ts'>
    import { Node } from './Node.svelte'
    let { query = $bindable(""), results=$bindable([]), input = [], filters=[] } = $props()
    $effect(() => {
      const res = input.filter((o) => {
        return o.db.title.toLowerCase().includes(query)
      })
      results = res.sort((a,b) => a.db.difficulty-b.db.difficulty)
    })
  </script>
  <form>
    <fieldset role="group">
      <input bind:value={query} type="text" placeholder="Search by title..." />
    </fieldset>
  </form>
