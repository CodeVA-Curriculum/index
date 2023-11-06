<script lang='ts'>
    import type {Frontmatter} from '$lib/utils/frontmatter'
    export let data:Frontmatter;
    import {onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faCloudArrowDown, faFolder, faFile} from '@fortawesome/free-solid-svg-icons'
    import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons'
    import {srcToUrl} from '$lib/utils/pathUtils'
    
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
                    <a data-sveltekit-reload href={srcToUrl(data.pathData.path)}>{data.title}</a>
                    <!-- <Fa class= 'mx-2' icon={icon} /> -->
                </h2>
                <p class='heading'>a {data.types} {data.contents? "pack ":" "}by {data.authors}</p>
                <div class='buttons'>
                    <a href={data.links.drive} class='button is-primary is-small has-tooltip-arrow has-tooltip-down' data-tooltip='Open Google Drive'>
                        Google Drive
                        <Fa class='ml-2' icon={faGoogleDrive} />
                    </a>
                    {#if data.links.pdf}
                    <a href={data.links.pdf} data-tooltip="Download PDF" class='has-tooltip-arrow has-tooltip-bottom button is-small'>
                        PDF
                        <Fa class='ml-2' icon={faCloudArrowDown} />
                    </a>
                    {/if}
                    <a data-sveltekit-reload class='button is-small is-secondary' href={srcToUrl(data.pathData.path)}>Read More</a>
                </div>
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
</style>