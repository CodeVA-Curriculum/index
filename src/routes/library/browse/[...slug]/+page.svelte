<script lang='ts'>
    import type {Element} from '$lib/utils/elementTypes'
    export let data:Element;

    import ElementView from '$lib/components/element-views/ElementView.svelte';

    import {onMount} from 'svelte'
    import SupporterPop from '$lib/components/element-views/SupporterPop.svelte';

    let metaDescription = ""
    let metaKeywords = ""

    onMount(()=>{
        console.log(data)

        // Strip HTML from data.content
        const start = data.content.indexOf('<p>')
        const end   = data.content.indexOf('</p>')
        metaDescription = data.content.slice(start+3, end).replace(/<[^>]*>?/gm, '')
        
        // get keywords from tags, subjects, types, audiences
        metaKeywords =   stringifyArray(data.frontmatter.tags)+','
                        +stringifyArray(data.frontmatter.subjects)+','
                        +stringifyArray(data.frontmatter.types)+','
                        +stringifyArray(data.frontmatter.audiences)
    })

    function stringifyArray(array:string[]):string {
        let out = ''
        for(let i=0;i<array.length;i++) {
            out+=array[i]
            if(i!=array.length-1) {
                out+=','
            }
        }
        return out
    }
</script>

<svelte:head>
    <title>{data.frontmatter.title} | CodeVA Curriculum Library</title>
    <meta name="{data.frontmatter.title} | CodeVA Curriculum Library" content="{metaDescription}">
    <meta name="author" content="{data.frontmatter.authors}">
    <meta name="keywords" content="{metaKeywords}">
</svelte:head>

<div class='container is-max-desktop'>
    <div class='section'>
        <ElementView data={data} />
    </div>
    
</div>
<div class='support-wrap'>
    <SupporterPop vdoe={data.frontmatter.vdoe} />
</div>

<style lang='scss'>
    .support-wrap {
        position: fixed;
        bottom: 5rem;
        right: 5rem;
    }
</style>