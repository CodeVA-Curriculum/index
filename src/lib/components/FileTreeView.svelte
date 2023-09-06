<script>
    let tree = {
        title: 'Element Title',
        children: []
    }
</script>
<div class='panel'>
    <p class='panel-heading'>
        Files
    </p>
    {#each tree.children as child}
    <div class='panel-block'>
        <a>child element</a>
    </div>
    {/each}
</div>