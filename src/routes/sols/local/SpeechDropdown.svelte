<script lang='ts'>
    import Dropdown from "$lib/components/form-elements/Dropdown.svelte";
    import { fullGradeNames } from "$lib/utils/metaUtils";

    const options = fullGradeNames.splice(1, 8)
</script>

<div class='speech'>
    <h2 class='title is-2'>
        <span class='pr-4'>How do</span>
        <span class='dropdown-wrap'>
            <Dropdown
                defaultOption={'Kindergarten'}
                options={options}
                optionClasses='title is-2'
                width=''
            />
        </span>
        <span class='pl-4'>students learn this?</span>
    </h2>
</div>

<style lang='scss'>
    @import '$lib/styles/colors.scss';
    h2 {
        display: flex;
        align-items: center;
        & > span {
            flex-grow: 0;
        }
    }
    .dropdown-wrap {
        position: relative;
        top: -2.5rem;
    }
    .speech {
        min-height: 8rem;
        position: relative;
        padding: 0px;
        background: $light-blue;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        padding: 2rem;
    }

.speech:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0 20px 20px;
    border-color: $light-blue transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -1rem;
}
</style>