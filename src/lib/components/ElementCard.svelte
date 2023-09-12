<script lang='ts'>
    import type {Frontmatter} from '$lib/utils/frontmatter'
    export let data:Frontmatter;
    import {onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faCloudArrowDown} from '@fortawesome/free-solid-svg-icons'
    import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons'
    import {srcToUrl} from '$lib/utils'
    // onMount(()=>{
    //     console.log(srcToUrl(data.path))
    // })
</script>

<div class='element-card card my-5'>
    <div class='card-content'>
        <div class='columns is-mobile'>
            <div class='column is-narrow'>
                <img src='https://placekitten.com/300/300' >
            </div>
            <div class='column'>
                <h2><a href={srcToUrl(data.pathData.path)}>{data.title}</a></h2>
                <p class='heading'>by {data.authors}</p>
                <div class='buttons'>
                    <a class='button is-small is-primary' href={srcToUrl(data.pathData.path)}>Read More</a>
                    <button class='button is-small has-tooltip-arrow has-tooltip-down' data-tooltip='Open Google Drive'>
                        Google Drive
                        <Fa class='ml-2' icon={faGoogleDrive} />
                    </button>
                    <button data-tooltip="Download PDF" class='has-tooltip-arrow has-tooltip-bottom button is-small'>
                        PDF
                        <Fa class='ml-2' icon={faCloudArrowDown} />
                    </button>
                    
                </div>
            </div>
        </div>
    </div>
</div>

<style lang='scss'>
    .element-card:hover {
        background-color: whitesmoke;
    }
    img {
        width: 92px;
        border-radius: 46px;
    }
    h2 {
        font-size: larger;
    }
</style>