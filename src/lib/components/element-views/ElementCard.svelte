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
    import { getThumbnail } from '$lib/utils/metaUtils';
    import ElementButtonsVertical from './ElementButtonsVertical.svelte';
    
    let icon;
    let image:string;
    let imageStyle:string = ''
    let tagList:string[] = []
    let gradeList:string[]|string = []
    let contentsString = ""

    onMount(async ()=>{
        if(data.contents && data.contents.length > 0) {
            icon = faFolder
        } else {
            icon = faFile
        }
        const thumbnail = data.links && data.links.drive ? await getThumbnail(data.links.drive) : false
        

        if(thumbnail) {
            image = thumbnail as string
            imageStyle = 'page'
        } else {
            image = data.image? "/images/" + data.image: '/images/default.png'
            imageStyle = 'icon'
        }
        console.log(data.title, image)
        console.log("tags", data.tags)
        tagList = typeof(data.tags[0]) == typeof("string") && typeof(data.tags) != typeof("string") ? data.tags : (data.tags as unknown as string).split(', ')
        gradeList = typeof(data.grades[0]) == typeof("string") ? data.grades[0] : (data.grades as unknown as string).split(', ')
        if(data.contents && data.contents.length > 0) {
            contentsString = `; contains ${data.contents.length} resources`
        }
    })
</script>


<div class='element-card card my-5'>
    <div class='card-content'>
        <div class='columns is-mobile'>
            <div style='position: relative;' class='column is-narrow'>
                <img 
                    alt="A logo for the {data.title} resource from CodeVA" 
                    src={image}
                    class={imageStyle}
                >
                {#if data.contents && data.contents.length > 0}
                <div class='type-banner heading'>
                    <span class='count'>
                        <Fa size=1.5x icon={faFolder} />
                        <span>{data.contents.length}</span>
                    </span>
                    <span class='ml-1'>Items</span>
                </div>
                {/if}
            </div>
            <div class='column has-text-left'>
                <h2>
                    <a data-sveltekit-reload href={srcToUrl(data.pathData.path).replace('/meta', '')}>{data.title}</a>
                    <!-- <GradePill text={data.grades} /> -->
                    <!-- <span class='tag is-light'>{data.subjects}</span> -->
                </h2>
                <div class='metadata'><span class='narrow'>Authors:</span>    <span class='wide'>{data.authors}</span></div>
                <div class='metadata'><span class='narrow'>Grades:</span>     <span class='wide'>{gradeList}</span></div>
                <div class='metadata'><span class='narrow'>Subjects:</span>   <span class='wide'>{data.subjects}</span></div>
                <div class='metadata'><span class='narrow'>Types:</span>      <span class='wide'>{data.types}{contentsString}</span></div>    
                <p class='taglist mt-2'> 
                    <span>
                        {#each tagList as tag}
                        <span class='tag mr-1'>{tag}</span>
                        {/each}
                    </span>
                </p>
            </div>
            {#if data.links}
            <div class='column is-2'>
                <ElementButtonsVertical meta={data} size={'is-small my-1 py-2'}>
                    <a data-sveltekit-reload class='is-fullwidth button is-small is-secondary my-1 py-2' href={srcToUrl(data.pathData.path).replace('/meta', '')}>Read More</a>
                </ElementButtonsVertical>
            </div>
            {/if}
        </div>
        <!-- /thumbnails/1Ka5czon_fe5O1LaPiHnPegaTSomaMRF4QtUnMkeN-C4.png -->
    </div>
    <!-- <div style='position: relative;'>
    <ElementButtons meta={data} size={'is-small mx-1 px-2'}>
        <a data-sveltekit-reload class='button is-small is-secondary mx-1 px-2' href={srcToUrl(data.pathData.path).replace('/meta', '')}>Read More</a>
    </ElementButtons>
</div> -->
</div>

<style lang='scss'>
    @import "../../styles/colors.scss";
    h2 {
        font-weight: bold;
    }
    .type-banner {
        background-color: $light-green;
        position: absolute;
        width: 100px;
        justify-content: center;
        display: flex;
        align-items: center;
        // flex-grow: 1;
        border-radius: 6px;
        font-weight: bold;
        font-size: 10pt;
        top: 100px;
        padding: 0.25rem 0.25rem;
        // height: 3rem;
        .count {
            position: relative;
            top: 1px;
        }
        .count > span {
            position: absolute;
            left: 4px;
            color: $light-green;
            font-weight: bold;
        }
    }
    .element-card {
        position: relative;
        &:hover {
            background-color: whitesmoke;
            cursor: pointer;
        }
    }
    img.icon {
        width:100px;
        height: auto;
        border-radius: 50px;
    }
    img.page {
        width: 100px;
        border: 1px solid gray;
        -webkit-box-shadow: 10px 10px 5px -8px rgba(0,0,0,0.75);
        -moz-box-shadow: 10px 10px 5px -8px rgba(0,0,0,0.75);
        box-shadow: 10px 10px 5px -8px rgba(0,0,0,0.75);
    }
    h2 {
        font-size: larger;
    }
    // .tag {
    //     float: right;
    // }
    .metadata {
        display: flex;
        font-size: 10pt;
        line-height: 110%;
        margin-top: 3px;
        .narrow {
            width: 5rem;
            font-weight: bold;
        }
        .wide {
            flex-grow: 2;
        }
    }
</style>