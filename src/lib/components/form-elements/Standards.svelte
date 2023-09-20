<script lang='ts'>
    import {onMount} from 'svelte'
    import Fa from 'svelte-fa'
    import {faCheck} from '@fortawesome/free-solid-svg-icons'
    import InputWithDropdown from "./InputWithDropdown.svelte";

    export let selectedSubjects:string[] = []
    
    let expanded:boolean = true

    onMount(() => {
        console.log("Getting standards from api...")
    })
</script>

<div class='standards-select'>
    <InputWithDropdown title="Standards" placeholder="Choose standards and subject area..." selected={[]}>
        <div class='dropdown-item columns is-mobile'>
            <div class='column is-narrow pl-0 ml-0'>
                <Fa icon={faCheck} />
            </div>
            <div class='column px-0 mx-0'>
                <p>Computer Science</p>
            </div>
            <div class='column is-narrow'><span class='is-italic tag'>select all</span></div>
        </div>
    </InputWithDropdown>
</div>