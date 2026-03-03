<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/index.scss';
	// import '$lib/styles/fonts/face.css';
	let {  children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div style='display: flex; height: 100vh; flex-direction: column;'>
{@render children()}
</div>
