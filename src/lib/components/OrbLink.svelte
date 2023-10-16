<script lang='ts'>
    import {base} from '$app/paths'

    interface Element {
        path:string,
        title:string,
        img:string
    }
    export let data:Element;
</script>

<a class='orb' href="{data.path}">
    <div class='img-wrap'>
        <img alt='a placeholder' src={data.img} >
    </div>
    <p>{data.title}</p>
</a>

<style>
    p {
        font-size: 11pt;
        color: #0f3760;
    }
    .orb {
        display: inline-block;
        width: 180px;
        padding: 1rem 0;
        margin: 1rem 1rem;
        text-align: center;
        vertical-align: top;
        border-radius: 20px;
    }
    .orb:hover {
        background-color: whitesmoke;
        text-decoration: underline;
    }
    .img-wrap {
        border-radius: 100px;
        width: 160px;
        height: 160px;
        margin: 0.5rem auto;
        border-color: black;
        border-width: 2px;
        /* border-style: solid; */
        overflow: hidden;
    }

</style>