<script lang="ts">
	// import '$lib/styles/fonts/face.css';
	import GuideNav from '$lib/components/guide/GuideNav.svelte'
	let {  data, children } = $props();
</script>

<GuideNav guide={data.guide} session={data.session} />
{@render children()}
