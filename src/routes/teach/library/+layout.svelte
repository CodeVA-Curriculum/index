<script lang='ts'>
	let { children } = $props();
</script>
<div class='container'>
{@render children()}
</div>

<style lang='scss'>
	.breadcrumb{ position: absolute; top: 0; }
</style>

