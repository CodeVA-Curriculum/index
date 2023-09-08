<script lang='ts'>
    import {base} from '$app/paths'
    import type { Element } from '$lib/utils/elementTypes';
    export let data:Element;
</script>

<a class='orb' href="{data.path}">
    <img alt='a placeholder' src='https://placekitten.com/400/400' >
    <p>{data.title}</p>
</a>

<style>
    .orb {
        display: inline-block;
        width: 200px;
        padding: 1rem 1rem;
        margin: 1rem 1rem;
        text-align: center;
        vertical-align: top;
        border-radius: 20px;
    }
    .orb:hover {
        background-color: whitesmoke;
    }
    .orb > img {
        border-radius: 80px;
        width: 160px;
        
    }
    .projects {
        text-align: center;
    }
</style>