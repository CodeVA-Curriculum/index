<script>
    export let data;
    import {onMount} from 'svelte'
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
                <h2><a href={srcToUrl(data.path)}>{data.title}</a></h2>
                <p class='heading'>by {data.authors}</p>
                <div class='buttons'>
                    <button class='button is-small'>Read More</button>
                    <button class='button is-small'>PDF</button>
                    <button class='button is-small'>Google Drive</button>
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