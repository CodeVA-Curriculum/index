<script lang='ts'>
    import { base } from "$app/paths";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'

    export let lessons:string[] = []
</script>

<div class='carousel columns p-4'>
    <div class='column is-narrow arrow is-flex'>
        <span>
            <Fa icon={faChevronLeft} size='2x' />
        </span>
    </div>
    <div class='lesson column is-narrow is-flex'>
        <img class='image' src='https://placecats.com/300/400' alt="Lesson thumbnail">
        <!-- <div class='lesson-info'>
            <p><a href="{base}/TODO:">Lesson Title</a></p>
        </div> -->
        
    </div>
    <div class='column is-narrow arrow is-flex'>
        <span>
            <Fa icon={faChevronRight} size='2x' />
        </span>
    </div>
</div>
<!-- <div class='bottom'>
    <a class='button is-fullwidth'>Browse in the Curriculum Library</a>
</div> -->

<style lang='scss'>
    .carousel {
        height: 250px;
        width: 0px;
        margin: 0 0 ;
    }
    .lesson {
        // background-color: powderblue;
        margin: 0 1rem;
    }
    .arrow {
        width: 2rem;
        align-items: center;
        justify-content: center;
        // background-color: pink;
        &:hover {
            border: 1px solid grey;
            border-radius: 4px;
        }
    }
    .lesson-info {
        height: 100%;
        padding: 5px 1rem;
    }
    // .bottom {
    //     display: block;
    // }
</style>