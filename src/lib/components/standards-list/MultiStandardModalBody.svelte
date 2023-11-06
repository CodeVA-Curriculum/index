<script lang='ts'>
    export let standard = []
</script>

<div class='modal-card'>
    <header class='modal-card-head'>
        <p>Standard Group</p>
    </header>
    <section class='modal-card-body'>
        {#each standard as std}
        <p>{std.id}</p>
        {/each}
    </section>
    <footer class='modal-card-foot'>
        <slot name='footer' />
    </footer>
</div>