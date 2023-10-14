<script lang='ts'>
    import { faCaretLeft, faPlusCircle, faPlus, faClose, faCheck } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'
    import { SvelteComponent, onMount } from "svelte";
    import StandardModal from "./StandardModal.svelte";

    let standardSelected = false
    let active:boolean = false
    let icon = faPlusCircle

    let modal:SvelteComponent

    export let standard;
    export let selected:any[] = []

    onMount(() => {
        // console.log(standard)
    })

    const standardFinder = (element) => {
        return standard.id == element.id
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
        selected = selected.filter(std => std.id !== standard.id);
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
        <!-- TODO: a11y stuff -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span>... <span class='link-like' on:click={modal.activate()}>See More</span></span>
    </div>
    <StandardModal bind:this={modal} standard={standard} >
        <span slot='footer'>
            <button on:click={handler} class="button {standardSelected? 'is-dark':'is-success'} is-hovered">
                <Fa class='mr-3' icon={icon} />
                {standardSelected? "Remove From":"Add To"} Search Filter
            </button>
            <button on:click={modal.deactivate} class="button">Close</button>
        </span>
    </StandardModal>
</article>

<style>
    .link-like:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    .link-like {
        color: lightskyblue;
    }
    .ic > .onhover {
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