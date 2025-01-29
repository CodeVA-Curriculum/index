<script lang='ts'>
    import Carousel from "./Carousel.svelte";
    import TableRow from "./Row.svelte";
    import { testData } from "./_data";
    import type { Row } from "./_data";

    let rows:Row[] = testData//[]

    function createEmptyRow():Row {
        return {
            title: '',
            description: '',
            duration: 1,
            sols: [],
            csols: [],
            suggestedSOLs: [],
            lessons: []
        }
    }

    function moveUp(position:number) {
        console.log("Moving row up...")
    }
    function moveDown(position:number) {
        console.log("Moving row down...")
    }
    function addBelow(position:number) {
        console.log("Adding row below", position)
        if(position == rows.length -1) {
            rows = [...rows, createEmptyRow()]
        } else {
            const backHalf = rows.splice(position, position + 1)
            const topHalf = rows.splice(0, position+1)
            rows = [...topHalf, createEmptyRow(), ...backHalf]
        }
    }
</script>
<table class='table is-bordered is-fullwidth is-narrow'>
    <thead>
        <tr>
          <th>Week #</th>
          <th>Unit Description</th>
          <th>Non-CS SOLs</th>
          <th>CS SOLs</th>
          <th>Example CS Lesson Plan(s)</th>
          <!-- <th></th> -->
        </tr>
    </thead>
    <tbody>
        {#each rows as row, i}
            <TableRow 
                position={i}
                entries={row}
                on:add={(e) => addBelow(e.detail)}
                on:up={(e) => moveUp(e.detail)}
                on:down={(e) => moveDown(e.detail)}
            />
        {/each}
    </tbody>
</table>

<style lang='scss'>

</style>