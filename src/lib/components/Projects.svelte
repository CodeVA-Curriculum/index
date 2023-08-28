<script lang='ts'>
   let elems:number[] = [0, 0, 0, 0, 0, 0] 
</script>

<div class='projects'>
    {#each elems as el}
        <div class='orb'>
            <img alt='a placeholder' src='https://placekitten.com/400/400' >
            <a href='/'><p>Title of Resource</p></a>
        </div>
    {/each}
</div>

<style>
    .orb {
        display: inline-block;
        width: 160px;
        margin: 10px 10px;
        text-align: center;
    }
    .orb > img {
        border-radius: 80px;
    }
    .projects {
        text-align: center;
    }

</style>