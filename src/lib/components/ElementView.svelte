<script lang='ts'>
    import type {Element} from '$lib/utils/elementTypes'
    import DocumentHeader from "./DocumentHeader.svelte";
    import ElementCard from "./ElementCard.svelte";
    export let data:Element
    // let standards = [0, 0, 0, 0]

    // TODO: pull from frontmatter or children
    let standards = {
        'Computer Science': [0, 0, 0, 0],
        'Data Science': [0, 0, 0, 0]
    }

    // let tags = ['tag', 'tag','tag', 'tag', 'tag']
</script>

<div class='content'>
    <DocumentHeader meta={data.frontmatter} />
    <hr>
    <div class='columns'>
        <div class='column is-two-thirds'>
            {@html data.content}
            
            {#each data.frontmatter.members as member}
                <ElementCard data={member} />
            {/each}
        </div>
        <div class='column ml-3'>
            <div class='sidebar'>
                <h3>Standards</h3>
                {#each Object.entries(standards) as [title, stds]}
                <p>
                    <i>{title}:</i>
                    {#each stds as std}
                    <!-- TODO: fix link and pull data from content -->
                    <a href='/' class='tag std-tag mx-1 my-1'>N.XX.n</a>
                    {/each}
                </p>
                {/each}
            </div>
            <div class='sidebar'>
                <h3>Tags</h3>
                <!-- TODO: fix link, use tag filter search URL -->
                {#each data.frontmatter.tags as tag}
                <a href='/' class='tag m-1'>{tag}</a>
                {/each}
            </div>
            
        </div>
    </div>
</div>

<style lang='scss'>
    @import '$lib/styles/colors.scss';
    .sidebar {
        margin-bottom: 3rem;
        background-color: $light-green;
        padding: 1rem 1rem;
    }
</style>