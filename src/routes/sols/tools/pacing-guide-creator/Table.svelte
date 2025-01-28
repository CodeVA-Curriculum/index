<script lang='ts'>
    import Carousel from "./Carousel.svelte";
    import TableRow from "./Row.svelte";
    import { testData } from "./_data";
    import type { Row } from "./_data";

    let rows:Row[] = testData//[]
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
        <TableRow position={i} />
        {/each}
    </tbody>
</table>

<style lang='scss'>

</style>