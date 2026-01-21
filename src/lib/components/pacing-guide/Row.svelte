<script lang='ts'>
  import Carousel from '$lib/components/pacing-guide/Carousel.svelte'
  import Editable from '$lib/components/pacing-guide/Editable.svelte'

  import Fa from 'svelte-fa'
  import { faPencil, faPlus, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
  import StandardsSelect from './StandardsSelect.svelte';

 let { row = $bindable(), first, last, operations, elements }= $props();
  let editable:any = $state()
  let editingState = false;

  let selectedSOLs = $state([])
</script>
<tr>
  <td>
    <div class='td-wrap'>
      {row.unit}
    </div>
  </td>
  <td class='description'>
    <div class='td-wrap'>
      <Editable bind:this={editable} bind:text={row.description} />
    </div>
  </td>
  <td class='sols'>
    <div class='td-wrap'>
    <StandardsSelect bind:selectedIds={selectedSOLs} />
    </div>
  </td>
  <td class='carousel'>
    <div class='td-wrap'>
      <Carousel sols={selectedSOLs} elements={elements} />
    </div>
  </td>
  <td>
    <div class='td-wrap ui'>
      <button id="up" disabled={first} onclick={() => operations.up(operations.id)}>
        <Fa icon={faArrowUp} />
      </button>
      <button id="down" disabled={last} onclick={operations.down}>
        <Fa icon={faArrowDown} />
      </button>
      <button id="delete" onclick={operations.delete}>
        <Fa icon={faTrash} />
      </button>
    </div>
  </td>
</tr>

<style lang='scss'>
  @use"$lib/styles/theme.scss";
  td {
    position: relative;
    border: 1px solid #e7eaf0;
    // min-height: 10rem;
    padding: 0;
  }
  .ui {
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    button { width: 40px; height: 40px; background-color: white; border: 1px solid black; color: black; padding: 0; }
    button:hover {
      background-color: whitesmoke;
      &#trash {
        background-color: theme.$danger;
        color: white;
        border-color: theme.$danger;
      }
    }
  }
  .description {
    // min-width: 800px;
    // border: 1px solid red;
    flex-grow: 4;
  }
  .sols {
    // min-width: 275px;
    & button {
      background-color: white;
      color: black;
    }
    flex-grow: 0;
  }
  .carousel {
      flex-grow: 0;
      max-width: 400px;
  }
  button:hover {
    span { display: inline-block; }
  }
  .td-wrap {
    display: flex;
    flex-direction: column;
    height: 11rem;
    padding: 8px;  
  }
</style>
