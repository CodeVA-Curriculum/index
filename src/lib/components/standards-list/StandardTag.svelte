<script lang='ts'>
    export let standard:object
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function deleteSelf() {
		dispatch('delete', {
			data: standard
		});
	}
</script>

<span class='tag is-dark mr-1 ml-0 my-0 mt-1'>
    {standard.title}
    <button on:click={()=>deleteSelf()} class='delete is-small'></button>
</span>