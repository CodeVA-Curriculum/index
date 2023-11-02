<script lang='ts'>
    import {base} from '$app/paths'
    import { SvelteComponent, createEventDispatcher, onMount } from 'svelte';
    import StandardModal from './StandardModal.svelte';
	import Fa from 'svelte-fa'
    import { faLink } from '@fortawesome/free-solid-svg-icons';
	import {gradeList, fullGradeNames} from '$lib/utils/metaUtils'
    import type { Standard } from '$lib/utils/elementTypes';

	export let standard:Standard
	export let status:boolean
	export let del = false
	export let theme='is-dark'
	export let id:string
	export let get = false;

	const dispatch = createEventDispatcher();
	let modal:SvelteComponent

	let obj:Standard
	onMount(()=> {
		console.log("Mounted standard pill")
		if(fetch && id) {
			console.log("Fetching standard", id)
			const p = fetch(`${base}/api/standards/${id}.json`)
			p.then((o) => {
				o.json().then((data) => {
					obj = data
				})
			})
		} else {
			obj = standard
		}
	})

	function deleteSelf() {
		dispatch('delete', {
			data: standard
		});
	}

	let url = new URLSearchParams()
	$: url = generateUrl(standard)

	function generateUrl(standard) {
		url = new URLSearchParams()
		if(obj) {
			url.set('sol', obj.id)
			url.set('grade', gradeList[fullGradeNames.indexOf(obj.grade)])
			url.set('subj', obj.subject)
		}
		return url.toString()
	}
</script>

<span class='tag mr-0 ml-0 my-0 mt-1 {status ? theme : 'disabled'}'>
	<!-- TODO: add modal & modes/slot for filter page or for lesson plan view (linked to search page)  -->
	<!-- TODO: add  -->
    <span on:click={() => {modal.activate()}} class='open'>{obj && obj.id? obj.id : id? id:'No ID!'}</span>
	{#if del}
    <button on:click={()=>deleteSelf()} class='delete is-small'></button>
	{/if}
</span>

{#if obj}
<StandardModal bind:this={modal} standard={obj}>
	<span slot='footer'>
		<a href={`${base}/library/search?${url}`} class="button is-success is-hovered">
			<Fa class='mr-3' icon={faLink} />
			See Materials Related to this Standard
		</a>
		<button on:click={modal.deactivate} class="button">Close</button>
	</span>
</StandardModal>
{/if}

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