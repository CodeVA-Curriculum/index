<script lang='ts'>
    import Fa from 'svelte-fa'
    import Form from './Form.svelte'
    import Table from './Table.svelte'
    import { faPencilSquare, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";

    let formUp = false
</script>

<div class='unit add'>
    Add a unit
</div>

<style lang='scss'>
    .unit.add {
        border: 4px dashed gray;
        border-radius: 0px;
        padding: 2rem 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: grey;
        &:hover {
            background-color: whitesmoke;
        }
        & > span {
            font-size: 150%;
            margin-left: 1rem;
            font-weight: bolder;
            position: relative;
            top: 3px;
        }
    }
</style>