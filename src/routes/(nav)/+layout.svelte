<script lang="ts">
	import Nav from '$lib/components/Nav.svelte'
	// import '$lib/styles/fonts/face.css';
	let { data, children } = $props();
</script>

<Nav user={data.user} session={data.session} />
{@render children()}
