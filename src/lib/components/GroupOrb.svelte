<script lang='ts'>
    import {base} from '$app/paths'
    import type { Element } from '$lib/utils/elementTypes';
    import type { Frontmatter } from '$lib/utils/frontmatter';
    import { srcToUrl } from '$lib/utils/pathUtils';
    import { onMount } from 'svelte';
    export let meta:Frontmatter;

    onMount(()=>{
        // console.log()
    })
</script>

<a class='orb' href="{srcToUrl(meta.pathData.path.replace('meta', ''))}">
    <div class='wrap'>
        <img alt='a placeholder' src='/images/{meta.image}' >
    </div>
    <p>{meta.title}</p>
</a>

<style>
    .orb {
        /* background-color: pink; */
        display: inline-block;
        width: 200px;
        /* height: 200px; */
        padding: 1rem 1rem;
        margin: 1rem 1rem;
        text-align: center;
        vertical-align: top;
        border-radius: 20px;
    }
    .orb:hover {
        background-color: whitesmoke;
    }
    .orb > .wrap {
        border-radius: 80px;
        width: 160px;
        height: 160px;
        margin: 0 auto;
        /* background-color: pink; */
        position: relative;
    }
    .wrap > img {
        margin: 0 auto;
        width: 160px;
        border-radius: 80px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>