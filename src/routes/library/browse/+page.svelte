<script lang='ts'>
    import {onMount} from 'svelte'
    import GroupCard from '$lib/components/GroupCard.svelte';
    import Projects from '$lib/components/Projects.svelte';
    export let data;
    let lessonGroups:any = []

    onMount(()=>{
        lessonGroups = data.projects
    })

</script>

<svelte:head>
    <title>Browse the Library</title>
</svelte:head>

<div class='lessons-browse container content'>
    <div class='section'>
        <h1>CodeVA's Curriculum Projects</h1>
        <p class='block'>Below, you'll find a list of all of CodeVA's curriculum projects. Each of these projects is an effort to support K-12 Virginia teachers across a wide range of contexts in providing high-quality computer science learning experiences to their students. Click the links below to explore our resources!</p>
        <!-- <p class='block'>If you end up using our resources in your classroom, we would love to hear from you! Reach out to <a href="mailto:curriculum@codevirginia.org">curriculum@codevirginia.org</a> and let us know how it went!</p> -->
    </div>
    <div class='section'>
        <Projects list={true} elems={lessonGroups} />
    </div>
</div>