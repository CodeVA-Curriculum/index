<script lang='ts'>
    import { onMount } from "svelte";

    export let text = ""
    const highSchool = ['9', '10', '11', '12', '9-12']
    const middleSchool = ['6', '7', '8', '6-8', '6-7', '7-8']
    const elementary = ['K', '1', '2', '3', '4', '5', 'K-5', 'K-2', '3-5', '4-5']
    let color = ""
    let display = ""
    let tags:object[] = []
    onMount(() => {
        display = text;
        if(highSchool.includes(text)) {
            tags = [...tags, {
                text: text,
                class: 'high-school'
            }]
        }
        if(middleSchool.includes(text)) {
            tags = [...tags, {
                text: text,
                class: 'middle-school'
            }]
        }
        if(elementary.includes(text)) {
            tags = [...tags, {
                text: text,
                class: 'elementary'
            }]
        }
    })
</script>

{#each tags as tag}
<span class='tag heading {tag.class}'>{tag.text}</span>
{/each}

<style lang='scss'>
    @import "../../../variables.scss";
    span {
        float: right;
        vertical-align: top;
        font-style: bold;
        &.high-school {
            background-color: $high-school-light;
        }
        &.middle-school {
            background-color: $middle-school-light;
        }
        &.elementary {
            background-color: $elementary-light;
        }
    }
</style>