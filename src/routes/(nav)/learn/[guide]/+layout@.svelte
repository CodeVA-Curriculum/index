<script lang="ts">
	import { onMount } from 'svelte'
	import { setContext } from 'svelte'
	import { Project } from '$lib/components/guide/Project.svelte.ts'
	// import '$lib/styles/fonts/face.css';
	import GuideNav from '$lib/components/guide/GuideNav.svelte'
	let {  data, children } = $props();
	for(const project of data.guide.projects) {
		const p = new Project(project)
		console.log("setting context...")
		setContext(project.path, p)
	}
</script>

<GuideNav guide={data.guide} session={data.session} />
{@render children()}
