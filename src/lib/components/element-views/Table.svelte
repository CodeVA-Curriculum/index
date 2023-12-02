<script lang='ts'>
    import {base} from '$app/paths'
    import type {Frontmatter} from '$lib/utils/frontmatter'
    import { srcToUrl } from '$lib/utils/pathUtils';

    export let groups:Frontmatter[]=[]
</script>

<table class='table element-table has-text-left'>
    <thead>
        <tr>
            <th>Title</th>
            <th>Authors</th>
        </tr>
    </thead>
    <tbody>
        {#each groups as group}
        <tr>
            <td><a href='{srcToUrl(group.pathData.path).replace('/meta', '')}'>{group.title}</a></td>
            <td>{group.authors}</td>
        </tr>
        {/each}
    </tbody>
</table>

<style>
    tr:hover {
        background-color: whitesmoke;
    }
</style>