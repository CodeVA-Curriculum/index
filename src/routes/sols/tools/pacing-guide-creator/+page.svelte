<script lang='ts'>
    import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import Table from "./Table.svelte";
    import Unit from "./Unit.svelte";
    import Fa from 'svelte-fa'
    

    let editTitle = false;
    let title="Pacing Guide Title"

    let filename = title
    $: filename = title.toLowerCase().replaceAll(' ', '-') + '.json'
    let active = false;

    let instructions = true;
</script>

<div class='container is-fullheight'>
    <section class='section content'>
        <div style="display: {instructions? 'block' : 'none'}" class='box instructions'>
            <!-- TODO: add feature to dismiss instructions -->
            
            <h1>CS-Integrated Pacing Guide Creator</h1>
            <p><strong>Instructions:</strong> This tool is intended to help create a computer science integrated pacing guide for another non-CS subject area (e.g., mathematics). To create the pacing guide, you will enter details about your existing pacing into the form. The tool will generate CS connections for you based on the SOLs you address in each unit.</p>
            <ol>
                <li>Click the <code>+ Add a unit</code> button below</li>
                <li>Fill out the form with your unit details</li>
                <li>Click <code>Save</code> to download a pacing guide file, which you can upload into the tool at a later date. You can save a PDF version of your pacing guide by printing this page.</li>
            </ol>
            <article class='message is-warning'>
                <p class='message-body'>To protect your privacy, this page does not save your data. Before you leave this page, be sure to click the <code>Save</code> button to download your pacing guide!</p>
            </article>
            <button on:click={()=>instructions = false} class='button close p-2'><Fa size="1.5x" icon={faXmarkCircle} /></button>
        </div>
    </section>
    <section class='section'>
        <div class='units'>
            <Table />
        </div>
    </section>
</div>

<style lang='scss'>
    .instructions {
        position: relative;
        & > .close {
            position: absolute;
            width: 0;
            height: 0;
            right: 1.25rem;
            top: 1rem;
            color: grey;
        }
    }
    .pacing-title {
        font-style: italic;
        color: grey
    }
    input.pacing-title {
        height: 3rem;
    }
    .right-panel {
        display: block;
        margin-left: auto;
        margin-right: 7rem;
        // background-color: pink;
        button {
            float: right;
            margin-left: 0.5rem;
        }
    }
</style>