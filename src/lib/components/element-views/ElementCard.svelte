<script lang='ts'>
    import type {Frontmatter} from '$lib/utils/frontmatter'
    export let data:Frontmatter;
    import {onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faCloudArrowDown, faFolder, faFile, faSpinner} from '@fortawesome/free-solid-svg-icons'
    import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons'
    import {srcToUrl} from '$lib/utils/pathUtils'
    import ElementButtons from './ElementButtons.svelte';
    import GradePill from './GradePill.svelte';
    
    let icon;
    let image;
    onMount(()=>{
        if(data.contents && data.contents.length > 0) {
            icon = faFolder
        } else {
            icon = faFile
        }

        image = data.image? data.image: 'default.png'
    })
</script>

<div class='element-card card my-5'>
    <div class='card-content'>
        <div class='columns is-mobile'>
            <div class='column is-narrow'>
                <img 
                    alt="A logo for the {data.title} resource from CodeVA" 
                    src='/images/{data.image}' 
                >
            </div>
            <div class='column has-text-left'>
                <h2>
                    <a data-sveltekit-reload href={srcToUrl(data.pathData.path).replace('/meta', '')}>{data.title}</a>
                    <GradePill text={data.grades} />
                    <!-- <span class='tag is-light'>{data.subjects}</span> -->
                </h2>
                <p class='subtitle'>by {data.authors}</p>
                <ElementButtons meta={data} size={'is-small mx-1 px-2'}>
                <a data-sveltekit-reload class='button is-small is-secondary mx-1 px-2' href={srcToUrl(data.pathData.path).replace('/meta', '')}>Read More</a>
                </ElementButtons>
            </div>
        </div>
    </div>
</div>

<style lang='scss'>
    .element-card:hover {
        background-color: whitesmoke;
        cursor: pointer;
    }
    img {
        width: 92px;
        border-radius: 46px;
    }
    h2 {
        font-size: larger;
    }
    .tag {
        float: right;
    }
    .subtitle {
        font-size: 10pt;
        font-style: italic;
    }
</style>