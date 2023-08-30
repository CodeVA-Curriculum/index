<script lang='ts'>
    import Breadcrumb from "./Breadcrumb.svelte";

    interface Metadata {
        title:string,
        authors:string
    }

    export let meta:Metadata;
    
    let nodes = [
        {
            title: "Project-Based Data Science",
            link: "/"
        },
        {
            title: meta.title,
            link: "/"
        }
    ]
</script>

<div class='document-header content'>
    <Breadcrumb nodes={nodes} here={meta.title} />
    <div class='columns'>
        <div class='column is-one-quarter'>
            <img alt="a placeholder" src="https://placekitten.com/400/400">
        </div>
        <div class='column ml-5'>
            <h1>{meta.title}</h1>
            <p class='heading'>by {meta.authors}</p>
            <p>Part of the <i>Project-Based Data Science</i> project.</p>
            <div class='metadata'>
                <p><strong>Subject: </strong>Computer Science</p>
                <p><strong>Level: </strong>High School</p>
                <p><strong>Material Type: </strong>Lesson Plan, Unit of Study</p>
                <p><strong>License: </strong><a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC-BY-NC-SA</a></p>
            </div>
        </div>
    </div>

</div>

<style>
    .metadata > p {
        font-size: smaller;
        margin: 0 auto;
    }
    .metadata {
        margin-top: 1rem;
    }
</style>