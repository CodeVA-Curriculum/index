<script module lang='ts'>
  let history = $state([])
  function route(path) {
    console.log("Got click!")
    goto(path)
  }
  export { breadcrumbTrackingLink }
</script>
{#snippet breadcrumbTrackingLink(el)}
  <a onclick={() => route("/teach/library/browse/"+el.path)} href="/teach/library/browse/{el.path}">{el.title}</a>
{/snippet}
<script lang='ts'>
  import { untrack } from 'svelte'
  let { obj } = $props()
  $effect(() => {
    console.log(obj.path)
    untrack(() => {
      history.push(obj)
      if(history.length > 2) {
        history.pop(0)
      }
      console.log(history)
      // back button handling
      if(history.length > 1 && obj.path == history[0].path) {
        history[0] = history[1]
        history[1] = obj
      }
    })
  })
  
</script>
{#if history.length > 1}
<a class='back' role="button" href="/teach/library/browse/{history[0].path}">{history[0].title}</a>
{/if}

<style lang='scss'>
  @use "$lib/styles/theme.scss";
  a.back {
    background-color: white;
    font-size: theme.$small;
    color: theme.$text;
  }
</style>
