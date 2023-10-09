<script lang='ts'>
    import { faCaretLeft, faPlusCircle, faPlus, faClose, faCheck } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'
    import { onMount } from "svelte";

    let standardSelected = false
    let active:boolean = false
    let icon = faPlusCircle

    export let standard;
    export let selected:any[] = []

    const standardFinder = (element) => {
        return standard.title == element.title
    }


    $: {
        if(selected.some(standardFinder)) {
            standardSelected = true
            icon = faCheck
        } else {
            standardSelected = false
            icon = faPlusCircle
        }
    }

    function addStandard() {
        console.log("Adding standard")
        selected = [...selected, standard]
    }
    function removeStandard() {
        selected = selected.filter(std => std.title !== standard.title);
    }
    function handler() {
        if(standardSelected) {
            removeStandard()
        } else {
            addStandard()
        }
    }

    

    // dispatch event when plus sign is clicked
</script>
<article class='standard-element columns'>
    <div class='column is-narrow'>
        <button class='ic' on:click={handler}>
            <span class='default'><Fa size="0.8x" icon={icon} /></span>
            <span class='onhover'><Fa size="0.8x" icon={standardSelected? faClose:faPlusCircle} /></span>
        </button>
        <span><strong>{standard.title}</strong></span>
    </div>
    <div class='column short-description'>
        <span class='desc is-italic'>{standard.text}</span>
    </div>
    <div class='column is-narrow'>
        <!-- <Fa icon={faCaretLeft} /> -->
        <span>... <a on:click={()=> active = true}>See More</a></span>
    </div>
    <div class="modal {active? 'is-active' : ''}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class='modal-card-head'>
                <h1 class='modal-card-title'>{standard.title}
                    <span class='ml-5 tag is-dark'>Algorithms & Programming</span>
                    <span class='tag is-dark'>Kindergarten</span>
                </h1>
                <button on:click={()=>active=false} class="button closer" aria-label="close"><Fa size='1.25x' icon={faClose} /></button>
            </header>
            <section class='modal-card-body'>
                <p>{standard.text}</p>
                {#if standard.subs.length > 0}
                <ol>
                    {#each standard.subs as sub}
                    <li>sub</li>
                    {/each}
                </ol>
                {/if}
            </section>
            <footer class="modal-card-foot">
                <button on:click={handler} class="button {standardSelected? 'is-dark':'is-success'} is-hovered">
                    <Fa class='mr-3' icon={icon} />
                    {standardSelected? "Remove From":"Add To"} Search Filter
                </button>
                <button on:click={()=>active=false} class="button">Close</button>
            </footer>
        </div>
    </div>
</article>

<style>
    .ic > .hidden, .ic > .onhover {
        display: none;
    }
    .ic:hover > .onhover {
        display: block;
    }
    .ic:hover > .default {
        display: none;
    }
    .closer {
        background-color: whitesmoke;
    }
    .modal-card-body > p {
        font-size: medium;
    }
    .standard-element {
        margin: 0 0;
        padding: 0 0;
    }
    .standard-element:hover strong {
        text-decoration: underline;
    }
    .standard-element > .is-narrow {
        margin: 0 0;
        padding: 0 0;
    }
    .short-description {
        overflow-x: hidden;
        white-space: nowrap;
        width: 4rem;
        padding: 0 0;
        margin: 0 0;
        padding-left: 0.5rem;
        margin-left: 0.5rem;
    }
    span, p {
        font-size: small;
    }
    button {
        background-color: white;
        border-color: transparent;
    }
    .ic:hover {
        border-color: whitesmoke;
    }

</style>