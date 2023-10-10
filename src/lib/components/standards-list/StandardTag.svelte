<script lang='ts'>
    
    import { createEventDispatcher } from 'svelte';

	export let standard:object
	export let status:boolean

	const dispatch = createEventDispatcher();

	function deleteSelf() {
		dispatch('delete', {
			data: standard
		});
	}
</script>

<span class='tag mr-1 ml-0 my-0 mt-1 {status ? 'is-dark' : 'disabled'}'>
    {standard? standard.id : 'No ID!'}
    <button on:click={()=>deleteSelf()} class='delete is-small'></button>
</span>

<style>
	.disabled {
		background-color: whitesmoke;
		text-decoration: line-through;
		color: lightgrey;
	}
</style>