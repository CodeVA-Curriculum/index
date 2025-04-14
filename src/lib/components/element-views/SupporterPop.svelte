<script lang='ts'>
    import { onMount } from "svelte";

    export let vdoe = false;

    let open = false
    let addClass = 'in'
    let defaultMessage = ``
    let vdoeMessage = ``
    let message = defaultMessage
    let image = '/images/donate.png'
    onMount(() => {
        setTimeout(() => {open = true}, 500)
        if(vdoe) {
            message = vdoeMessage
            image = "/images/vdoe.png"
        }
    })
    function close() {
        addClass = 'out'
        setTimeout(() => {open = false}, 900)
    }
    
</script>

{#if open}
<div class='supporter-pop notification is-warning p-5 {addClass}'>
    <button on:click={close} class="delete"></button>
    <div class='img-wrap'>
        <img alt="a box opening to reveal a heart" src={image}>
    </div>
    {#if vdoe}
    <p class='text block'>CodeVA created this resource in partnership with the VDOE. It was paid for, in part, using state-appropriated funds. If you have questions about this resource, please email <a href="mailto:curriculum@codevirginia.org">curriculum@codevirginia.org</a>.</p>
    {:else}
    <p class='text block'>CodeVA created this material with support from a private donor.<br class='mb-2'>This resource <span class='emphasis'>was not created</span> in partnership with the VDOE and <span class='emphasis'>was not</span> paid for using state appropriations.</p>
    {/if}
</div>
{/if}

<style lang='scss'>
    .emphasis {
        font-weight:900;
        font-style: italic;
        text-decoration: underline;
    }
    .supporter-pop {
        &.in {
            animation-duration: 1s;
            animation-iteration-count: 1;
            animation-direction: normal;
            animation-name: slide-in;
        }
        &.out {
            animation-duration: 1s;
            animation-iteration-count: 1;
            animation-direction: normal;
            animation-name: slide-out;
        }
        display: flex;
        .img-wrap {
            width: 120px;
            justify-content: center;
            padding-right: 1rem;
        }
        .text {
            flex-grow: 2;
            justify-content: center;
            max-width: 400px;
        }
        // background-color: whitesmoke;
        border-radius: 0px;
        // border: 3px solid blue;
        padding: 1rem 1rem;
        -webkit-box-shadow: 1px 4px 25px -8px rgba(0,0,0,0.75);
        -moz-box-shadow: 1px 4px 25px -8px rgba(0,0,0,0.75);
        box-shadow: 1px 4px 25px -8px rgba(0,0,0,0.75);
    }
    @keyframes slide-in {
        from {
            translate:  0 150vh;
            // scale: 200% 1;
        }

        to {
            translate: 0 0;
            // scale: 100% 1;
        }
    }
    @keyframes slide-out {
        to {
            translate:  0 150vh;
            // scale: 200% 1;
        }

        from {
            translate: 0 0;
            // scale: 100% 1;
        }
    }
</style>