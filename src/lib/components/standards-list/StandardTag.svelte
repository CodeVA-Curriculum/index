<script lang='ts'>
    import {base} from '$app/paths'
    import { SvelteComponent, createEventDispatcher, onMount } from 'svelte';
    import StandardModal from './StandardModal.svelte';
	import Fa from 'svelte-fa'
    import { faLink } from '@fortawesome/free-solid-svg-icons';
	import {gradeList, fullGradeNames} from '$lib/utils/metaUtils'

	export let standard:object
	export let status:boolean
	export let del = false
	export let theme='is-dark'

	const dispatch = createEventDispatcher();
	let modal:SvelteComponent

	function deleteSelf() {
		dispatch('delete', {
			data: standard
		});
	}

	let url = new URLSearchParams()
	$: url = generateUrl(standard)

	function generateUrl(standard) {
		url = new URLSearchParams()
		if(standard) {
			url.set('sol', standard.id)
			url.set('grade', gradeList[fullGradeNames.indexOf(standard.grade)])
			url.set('subj', standard.subject)
		}
		return url.toString()
	}
</script>

<span class='tag mr-1 ml-0 my-0 mt-1 {status ? theme : 'disabled'}'>
	<!-- TODO: add modal & modes/slot for filter page or for lesson plan view (linked to search page)  -->
	<!-- TODO: add  -->
    <span on:click={() => {modal.activate()}} class='open'>{standard? standard.id : 'No ID!'}</span>
	{#if del}
    <button on:click={()=>deleteSelf()} class='delete is-small'></button>
	{/if}
</span>

<StandardModal bind:this={modal} standard={standard}>
	<span slot='footer'>
		<a href={`${base}/library/search?${url}`} class="button is-success is-hovered">
			<Fa class='mr-3' icon={faLink} />
			See Materials Related to this Standard
		</a>
		<button on:click={modal.deactivate} class="button">Close</button>
	</span>
</StandardModal>

<style>
	.open:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.disabled {
		background-color: whitesmoke;
		text-decoration: line-through;
		color: lightgrey;
	}
</style>