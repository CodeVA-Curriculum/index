<script lang='ts'>
    import {base} from '$app/paths'
    import { SvelteComponent, createEventDispatcher, onMount } from 'svelte';
    import StandardModal from './StandardModal.svelte';
	import Fa from 'svelte-fa'
    import { faLink } from '@fortawesome/free-solid-svg-icons';
	import {gradeList, fullGradeNames} from '$lib/utils/metaUtils'
    import type { Standard } from '$lib/utils/metaUtils';

	export let standard:Standard
	export let status:boolean
	export let del = false
	export let theme='is-dark'
	export let id:string
	export let get = false;

	const dispatch = createEventDispatcher();
	let modal:SvelteComponent

	let obj:Standard[] = []
	onMount(()=> {
		console.log("Mounted standard pill")
		if(get && id) {
			console.log("Fetching standard", id)
			const p = fetch(`${base}/api/standards/${id}.json`)
			p.then((o) => {
				// console.log(o)
				o.json().then((data) => {
					console.log(data)
					obj = [...data]
				})
			})
		} else {
			obj = [standard]
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

{#if standard}
<span class='tag mr-0 ml-0 my-0 mt-1 {status ? theme : 'disabled'}'>
    <span on:click={() => {modal.activate(); console.log('activating modal...')}} class='open'>{standard && standard.id? standard.id : id? id:'No ID!'}</span>
	{#if del}
    <button on:click={()=>deleteSelf()} class='delete is-small'></button>
	{/if}
</span>
{:else}
	<span class='tag mr-0 ml-0 my-0 mt-1 {status ? theme : 'disabled'}'>{id}</span>
	<!-- TODO: add modal with list of standards in it -->
	<!-- {#each [...obj] as std}
		<svelte:self get={true} status={true} theme='is-light' standard={std} />
	{/each} -->
{/if}

{#if standard}
<StandardModal bind:this={modal} standards={[standard]}>
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