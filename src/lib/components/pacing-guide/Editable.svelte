<script lang='ts'>
  import Fa from 'svelte-fa'
  import { faPencil, faSave } from "@fortawesome/free-solid-svg-icons"
  let { text = $bindable() } = $props()
  let editing = $state(false);
  let content = $state("")

  function save() {
    text = content
    editing = false
    console.log("saving", editing)
  }
</script>
<div class='edit'>
{#if editing || text.length == 0}
<textarea bind:value={content} rows=3></textarea>
<button class='little-edit' onclick={save}>
  <Fa icon={faSave} />
  <span>Save</span>
</button>
{:else if editing == false}
 <div>{text}</div>
 {/if}
 </div>

<style lang='scss'>
  .edit {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    // display: flex;
    // flex-direction: column;
    // border: 1px solid blue;
    // height: 7rem;
  }
  button.empty-edit {
    background-color: white;
    color: black;
    // flex-basis: 100%;
    // height: 100%;
  }
  button.little-edit {
    font-size: 12pt;
    height: 40px;
    background-color: white;
    color: black;
    padding: 0;
    padding-left: 0.5rem;
    // margin-top: 10px;
    float: right;
    position: relative;
    // top: 2rem;
  }
  textarea {
    font-size: 14pt;
    padding-bottom: 0;
    margin-bottom: 10px;
  }
  .description {
  min-height: 100px;
    border: 1px solid pink;
    &:hover {
      cursor: pointer;
    }
  }
  span { align-items: top;}
  input {
    flex-basis: 100%;
  margin: 0 0 ;
  }
</style>
