<script lang='ts'>
    import {onMount} from 'svelte'
    import GroupCard from '$lib/components/GroupCard.svelte';
    import Projects from '$lib/components/Projects.svelte';
    import { srcToUrl } from '$lib/utils/pathUtils';
    export let data;
    let lessonGroups:any = []

    onMount(()=>{
        lessonGroups = data.projects
    })

</script>

<svelte:head>
    <title>Browse the CodeVA Curriculum Library</title>
    <meta name="Browse the CodeVA Curriculum Library" content="Find free, sharable, and remixable computer science lessons, curricular resources, tutorials, and more aligned to the Virginia Computer Science Standards of Learning.">
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
    <div class='section'>
        <h1>CodeVA's Curriculum Lesson Index</h1>
        <p class='block'>Here, you'll find a table with every single lesson plan and lesson sequence in CodeVA's library.</p>
        <table class='table'>
            <thead>
                <tr class='headings'>
                    <td>Title</td>
                    <td>Grade(s)</td>
                    <td>Subject(s)</td>
                    <td>Type(s)</td>
                </tr>
            </thead>
            <tbody>
            {#each data.lessons as lesson}
            <tr>
                <td><a href={srcToUrl(lesson.pathData.path)}>{lesson.title}</a></td>
                <td>{#each lesson.grades as grade}{grade}{/each}</td>
                <td>{#each lesson.subjects as subj, i}{subj}{#if lesson.subjects.length > 1 && i < lesson.subjects.length-1}, {/if}{/each}</td>
                <td>{#each lesson.types as type, i}{#if i!=0}, {/if}{type}{/each}</td>
            </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
<style>
    tbody > tr:hover {
        background-color: whitesmoke;
    }
</style>