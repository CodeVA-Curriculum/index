  <script lang='ts'>
    import { Node } from './Node.svelte'
    let { query = $bindable(""), results=$bindable([]), input = [], filters=[] } = $props()
    $effect(() => {
      console.log("Searching", query)
      results = input.filter((o) => {
        return o.db.title.toLowerCase().includes(query)
      })
    })
  </script>
  <form>
    <fieldset role="group">
      <input bind:value={query} type="text" placeholder="Search by title..." />
    </fieldset>
  </form>
