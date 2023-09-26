<script lang='ts'>
    import { faCaretLeft, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'
    import type {Standard} from '$lib/utils/elementTypes'

    export let standard:Standard;

    // dispatch event when plus sign is clicked
</script>
<article class='standard-element'>
    <div class='card my-2'>
        <div class='card-content p-2 m-0'>
            <div class='columns'>
                <div class='column is-narrow'>
                    <button class='ic'><Fa size="0.8x" icon={faPlusCircle} /></button>
                    <span>standard.name</span>
                </div>
                <div class='column is-expanded'>
                    <span>Lorem ipsum</span>
                </div>
                <div class='column is-narrow'>
                    <Fa icon={faCaretLeft} />
                </div>
            </div>
            
        </div>
    </div>
</article>

<style>
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