<script lang='ts'>
    import Dropdown from "./Dropdown.svelte";
    import MultipleSelect from "./MultipleSelect.svelte";
    import TagsDropdown from "./TagsDropdown.svelte"

    const subjects = ['Computer Science', 'Language Arts', 'Social Studies', 'Mathematics', 'Science']
</script>

<div class='filters has-text-left'>

    <div class='columns'>
        <div class='column is-narrow'>
            <MultipleSelect items={subjects} />
        </div>
        <div class='column is-narrow'>
            Standards
        </div>
        <div class='column is-narrow'>
            <TagsDropdown />
        </div>
    </div>
    <!-- TODO: Tags -->
    
    
    <!-- TODO: grade level -->
    <!-- TODO: material type -->

</div>