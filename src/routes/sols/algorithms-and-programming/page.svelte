<script lang='ts'>
    import Video from '$lib/components/Video.svelte'
    import LessonCarousel from '../local/LessonCarousel.svelte';
    import SpeechDropdown from '../local/SpeechDropdown.svelte';
</script>

<div class='container'>
    <section class='section'>
        <h1 class='title is-1 mt-5'>Algorithms & Programming</h1>
        <div class='columns is-tablet mt-5 pt-5'>
            <div class='column'>
                <Video />
            </div>
            <div class='column is-flex'>
                <article class='box mb-2 content' style="flex: 1;">
                    TODO: Lorem ipsum dolor sit amet
                    <p>Pick a grade level using the dropdown below to learn more!</p>
                </article>
            </div>
        </div>
    </section>
    <section class='section'>
        <SpeechDropdown />
    </section>
    <section class='section'>
        <div class='columns is-tablet'>
            <div class='column'>
                <article class='box content'>
                    <h3 class='title is-3'>What Do Students Do?</h3>
                    <p>Lorem ipsum dolor sit amet</p>
                </article>
            </div>
            <div class='column'>
                <LessonCarousel />
            </div>
        </div>
    </section>
    <section class='section'>
        <h2 class='title is-2'>CS Vocabulary</h2>
        TODO:
    </section>
    <section class='section'>
        <h2 class='title is-2'>Lessons & Resources</h2>
        TODO:
    </section>
</div>