<script lang="ts">
	import Nav from '$lib/components/Nav.svelte'
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/index.scss';
	// import '$lib/styles/fonts/face.css';
	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div style='display: flex; height: 100vh; flex-direction: column;'>
<Nav session={data.session} />
{@render children()}
</div>
