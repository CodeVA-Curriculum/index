<script lang='ts'>
    import {base} from '$app/paths'
    import { onMount } from 'svelte';

    let strands:string[] = []

    onMount(async () => {
        const res = await (await fetch(`${base}/api/standards/course-strand-map.json`)).json()
        strands = res["Computer Science (2024)"]
    })
</script>

<div class='container content is-max-desktop'>
    <section class='section'>
        <h1>The Virginia Computer Science SOLs</h1>
        <p>TODO: Quis fugiat commodo esse labore enim dolore. Est est velit ullamco ipsum. Exercitation officia consectetur sint ex nisi incididunt incididunt nostrud ipsum labore reprehenderit sit commodo.</p>
    </section>
    <section class='section'>
        <h2>Tools for Integrating CS</h2>
        <div class='tile is-ancestor tool-grid'>
            <div class='tile'>
                <a href="{base}/library/browse/integration-toolkit">CS Integration Toolkit</a>
            </div>
            <div class='tile'>
                <a href="{base}/sols/tools/integration-grid">Browse Our Resources</a>
            </div>
            <div class='tile'>
                <a href='{base}/sols/tools/pacing-guide-creator'>Create a CS Pacing Guide</a>
            </div>
            <div class='tile'>
                <a href="{base}/sols/tools/browser">Interactive SOL Browser</a>
            </div>
            <p>Search Our Library</p>
        </div>
        
    </section>
    <section class='section'>
        <h2>Learn About the CS SOLs</h2>
        <p class='pb-5'>TODO: Consectetur do est duis sunt sint non officia anim reprehenderit. Elit laborum elit in commodo elit enim pariatur dolore pariatur id anim cupidatat dolor. Ipsum quis veniam eu dolor ea sunt ipsum occaecat cupidatat pariatur mollit est nisi. Voluptate veniam ut laboris et aute enim sint pariatur. Enim commodo cillum voluptate pariatur laborum ut ad velit voluptate mollit anim. Ipsum veniam laboris elit duis sint consectetur ut labore anim.</p>
        {#each strands as strand}
        <div class='columns box my-5'>
            <div class='column is-narrow'>
                <img src='https://placecats.com/150/200'>
            </div>
            <div class='column'>
                <h3>{strand}</h3>
                <p>TODO: Magna veniam consectetur in Lorem eiusmod. Non ex non et ex eu laboris consequat elit laborum occaecat occaecat. Ex officia in officia labore quis deserunt officia ea est est veniam pariatur consequat.</p>
                <button class='button is-primary'>
                    Learn More
                </button>
            </div>
        </div>
        {/each}
    </section>
</div>