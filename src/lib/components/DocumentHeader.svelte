<script lang='ts'>
    import Breadcrumb from "./Breadcrumb.svelte";
    import {base} from '$app/paths'
    import Fa from 'svelte-fa'
    import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons'
    import {faCloudArrowDown} from '@fortawesome/free-solid-svg-icons'

    interface Metadata {
        title:string,
        authors:string,
        path:string,
        parents?:string[]
    }

    export let meta:Metadata;

    // TODO: render nodes
    
    let nodes = [
        {
            title: '. .',
            link: `${base}/library`
        },
        {
            title: meta.title,
            link: meta.path       
        }
    ]
</script>

<div class='document-header content'>
    <Breadcrumb nodes={[...meta.parents, meta]} here={meta.title} />
    <div class='columns'>
        <div class='column is-one-quarter'>
            <img alt="a placeholder" src="https://placekitten.com/400/400">
        </div>
        <div class='column ml-5'>
            <h1>{meta.title}</h1>
            <p class='heading'>by {meta.authors}</p>
            {#if meta.parents.length > 0}
            <p>Part of the 
                {#each meta.parents as parent, i}
                {#if i!=0},{/if}
                {#if i==meta.parents.length-1 && meta.parents.length>1}and{/if}
                <a data-sveltekit-reload href='{base}/library/{parent.path}'><i>{parent.title}</i></a>
                {/each}
                project{meta.parents.length>1 ? 's' : ''}.</p>
            {/if}
            <div class='metadata'>
                <p><strong>Subject: </strong>Computer Science</p>
                <p><strong>Level: </strong>High School</p>
                <p><strong>Material Type: </strong>Lesson Plan, Unit of Study</p>
                <p><strong>License: </strong><a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC-BY-NC-SA</a></p>
            </div>
            <div class='buttons is-left my-5'>
                <a class='button is-primary' href='/TODO:'>
                    View {meta.children.length > 0? 'Group' : ''} on Google Drive
                    <Fa class='ml-2' icon={faGoogleDrive} />
                </a>
                <a class='button' href='/TODO:'>
                    Download {meta.children.length > 0? 'Group' : ''} PDF
                    <Fa class='ml-2' icon={faCloudArrowDown} />
                </a>
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