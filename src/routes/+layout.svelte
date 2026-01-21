<script lang="ts">
	import Nav from '$lib/components/Nav.svelte'
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/index.scss';
	let { children } = $props();
	import { 
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />
{@render children()}
