<script lang='ts'>
    import { faPencilSquare, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
    import Table from "./Table.svelte";
    import Fa from "svelte-fa";
    import Unit from "./Unit.svelte";


</script>

<div class='container is-fullheight'>
    <section class='section content'>
        <!-- TODO: add feature to dismiss instructions -->
        <h1>CS-Integrated Pacing Guide Creator</h1>
        <p><strong>Instructions:</strong> This tool is intended to help create a computer science integrated pacing guide for another non-CS subject area (e.g., mathematics). To create the pacing guide, you will enter details about your existing pacing into the form. The tool will generate CS connections for you based on the SOLs you address in each unit.</p>
        <ol>
            <li>Click the <code>+ Add a unit</code> button below</li>
            <li>Fill out the form with your unit details</li>
            <li>Click <code>Export</code> to download a pacing guide file, which you can upload into the tool at a later date, or click <code>Copy</code> to copy the rich text pacing guide to your clipboard. You can save a PDF version of your pacing guide by printing this page.</li>
        </ol>
    </section>
    <section class='section'>
        <h1 class='title pacing-title'>
            Pacing Guide Title
            <button class='ml-3'><Fa icon={faPenToSquare} /></button>
        </h1>
        <div class='units'>
            <Table />
        </div>
    </section>
</div>

<style lang='scss'>
    .pacing-title {
        font-style: italic;
        color: grey
    }
</style>