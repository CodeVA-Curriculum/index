<script lang='ts'>
    import {onMount} from 'svelte'
    import NestedDropdown from './NestedDropdown.svelte';
    import FlatDropdown from './FlatDropdown.svelte';
    import LoadingDropdown from './LoadingDropdown.svelte';

    export let title:string = "No Title"
    export let url:string|null = null
    export let id:string = 'no-id'
    export let width:string = 'auto'
    export let flat = true

    export let selected:string[] = []
    export let items:(string[]|object)

    let el:any = LoadingDropdown
    onMount(async () => {
        if(url) {
            items = await (await fetch(url)).json()
        }
    })
    $: {
        if(items) {
            el = flat? FlatDropdown : NestedDropdown
        }
    }
</script>

<div class='fetcher'>
    {#if el}<svelte:component items={items} this={el} title={title} id={id} width={width} />{/if}
</div>