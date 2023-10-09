<script lang='ts'>
    export let n = 0;
    export let list:any[] = []
    let count = 0
    export let cond = (obj) => {}

</script>
<span class='pill'>{list.filter((obj) => {
    console.log(list)
    return true
}).length}</span>

<style>
    .pill {
        background-color: whitesmoke;
        font-size: 8pt;
        padding: 0 5px;
        border-radius: 20px;
    }
</style>