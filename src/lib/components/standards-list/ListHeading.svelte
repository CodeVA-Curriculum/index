<script lang='ts'>
    import { faCaretLeft, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'

    export let title:string
    export let size:number
    export let indent:number
</script>

<div class='list-heading' style='margin-left: {indent}rem;'>
    <div class='columns'>
        <div class='column is-expanded'>
            <span class='mr-3'>{title}</span>
        </div>
        <div class='column is-narrow'>
            <button class='button has-icon left is-italic'>
                <Fa class='pr-2' icon={faPlusCircle} />
                Add All
            </button>
            <Fa class='ml-3' icon={faCaretLeft} />
        </div>
    </div>
    <slot />
</div>

<style>
    span {
        font-size: 10pt;
    }
    button {
        height: 1.5rem;
        margin-right: 0;
        font-size: 8pt;
    }
    button:hover {
        background-color: whitesmoke;
    }
</style>