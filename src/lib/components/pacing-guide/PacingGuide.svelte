<script lang='ts'>
  import Fa from 'svelte-fa'
  import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
  import { Row } from './types.svelte.ts'
  import RowComponent from '$lib/components/pacing-guide/Row.svelte'
    import Editable from './Editable.svelte';


  let { elements } = $props()
  let rows:any[] = $state([new Row(1)])

  function addRow():undefined {
    const lastRow = rows[rows.length-1]
    rows.push(new Row(lastRow.unit + 1))
  }
  function reIndex() {
    for(let i=0;i<rows.length;i++) {
      rows[i].unit = i+1
    }
  }
  function moveUp(index:number) {
    // console.log("Got call to move up", index)
    const el = rows.splice(index, 1)
    rows.splice(index-1, 0, el[0])
    reIndex()
 }
  function moveDown(index:number) {
    const el = rows.splice(index, 1)
    rows.splice(index+1, 0, el[0])
    reIndex()
  }
  function deleteRow(index:number) {
    rows.splice(index, 1)
    reIndex()
  }

  function opsFactory(id:number) {
    return {
      id: id,
      up: moveUp,
      down: moveDown,
      delete: deleteRow
    }
  }
</script>

<table>
  <thead>
    <tr>
      <th scope="col">Unit</th>
      <th scope="col">Description</th>
      <th scope="col">Standards</th>
      <th scope="col">CS Suggestions</th>
      <th style="text-align: center; display: none;"><Fa icon={faTrash} /></th>
    </tr>

  </thead>
    <tbody>
    {#each rows as row,i}
      <RowComponent
        bind:row={rows[i]}
        last={i==rows.length-1}
        first={i==0}
        operations={opsFactory(i)}
        elements={elements}
      />
    {/each}
    <tr>
      <td colspan=100>
        <div class='new-row'>
          <button onclick={addRow}>
            <Fa icon={faPlus} />
            <span><i>Click here to add a new row</i></span>
          </button>
        </div>
      </td>
    </tr>
    </tbody>
</table>

<style lang='scss'>
  .new-row {
    button {
      background-color: white;
      border: none;
      color: black;
      width: 100%;
      & > span { margin: 0 1rem; }
      &:hover {
        border: 1px solid black;
      }
    }
  }
</style>
