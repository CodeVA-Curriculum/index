<script lang='ts'>
  import Fa from 'svelte-fa'
  import { faClose } from '@fortawesome/free-solid-svg-icons'
  let { obj, children } = $props()
  let open = $state(false)
</script>

<span class='tag'><a onclick={() => open = true}>{obj.abbr}</a><span class='button-wrap'>{@render children?.() }</span></span>
<dialog {open}>
  <article>
    <header>
      <h4>{obj.abbr}</h4>
      <button onclick={() => open = false}><Fa icon={faClose} /></button>
    </header>
      <strong style="float: left; margin-right: .25rem;">{obj.title}:</strong>
      {@html obj.text}
      <ol style="list-style-type: lower-alpha;">
        {#each JSON.parse(obj.subs) as sub}
        <li>{sub}</li>
        {/each}
      </ol>
  </article>
</dialog>
<style lang='scss'>
  a {
    color: white;
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
  }
  button {
    float: right;
    position: relative;
    top: -1.5rem;
    background-color: transparent;
    color: black;
    padding: 0;
    margin: 0;
  }
  .close {
    padding: 0;
    margin: 0;
  }
  span {
    margin: 12px;
    display: flex;
    flex: 0 1;
    align-self: shrink;
  }
</style>
