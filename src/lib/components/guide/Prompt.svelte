<script lang='ts'>
  import Fa from 'svelte-fa'
  import { faClose } from '@fortawesome/free-solid-svg-icons'
  let {title, obj} = $props()
  console.log(obj)
  let response = $state('')
  let complete = $state(obj.status.length > 0 && obj.status[0].complete)
  function submit(e) {
    e.preventDefault()
    fetch("/learn", {
      method: "POST",
      body: JSON.stringify({
        type: "prompt",
        itemId: obj.id,
        answer: response,
        complete: complete
      })
    })
  }
</script>
<svelte:options customElement={{
    tag: 'practice-prompt',
    shadow: 'none',
    props: {
        title: { reflect: true, type: 'String' },
    }
}} />

<article class='practice-prompt'>
  <div class='head'>
    <form>
      <input bind:checked={complete} type="checkbox">
    </form>
    <h4>{title}</h4>
    <span><Fa icon={faClose} /></span>
  </div>
  <div class='body'>
    {@html obj.text}
  </div>
  <form onsubmit={submit}>
    <input type="textarea" id="response" name="response" bind:value={response} >
    <input type="submit" value="Save Answer" id="submit" >
  </form>
</article>
<style lang='scss'>
  .head {
    display: flex;
    flex-direction: row;
    input, span { flex: 0 1; }
    h4 {
      flex: 1;
      margin: 0;
      padding: 0;
    }
    margin-bottom: 1rem;
  }
</style>
