<script lang='ts'>
    import {onMount} from 'svelte'
    import GroupCard from '$lib/components/GroupCard.svelte';
    export let data;
    let lessonGroups:any = []

    onMount(()=>{
        lessonGroups = data.content
    })

</script>

<div class='lessons-browse section content'>
    <h1>Our Curriculum Projects</h1>
    <div class='groups-list'>
        {#each lessonGroups as group}
        <GroupCard meta={group} />
        {/each}
    </div>
</div>