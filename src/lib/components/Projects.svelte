<script lang='ts'>
    import {base} from '$app/paths'
    export let elems:any = []
//    let elems:number[] = [0, 0, 0, 0, 0, 0] 
</script>

<div class='projects'>
    {#each elems as el}
    <!-- {console.log(el.path)} -->
        <a class='orb' href="{base}/lessons/{el.path}">
            <img alt='a placeholder' src='https://placekitten.com/400/400' >
            <p>{el.title}</p>
        </a>
    {/each}
</div>

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