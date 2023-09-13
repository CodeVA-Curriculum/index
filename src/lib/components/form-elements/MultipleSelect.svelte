<script lang='ts'>
    import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'

    export let items:string[] = []
</script>

<div class='multiple-select'>
    <div class="dropdown is-active field">
        <label class='label is-small' for='dropdown-menu'>Subjects: </label>
        <div class="dropdown-trigger control">
          <button class="button is-small" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>Choose...</span>
            <span class='counter'>
                <span class='n-count'>1</span>
            </span>
            <Fa class='icon' icon={faCaretDown} />
          </button>
        </div>
        <div class="select is-small is-multiple dropdown-menu control options" id="dropdown-menu" role="menu">
          <select multiple size="{items.length > 8? 8:items.length}" class="dropdown-content is-small">
            {#each items as item}
            <option class='dropdown-item' value="Argentina">{item}</option>
            {/each}
          </div>
      </div>
</div>

<style>
    label {
        width: 4rem;
        margin-top: 5px;
    }
    option {
        font-size: small;
    }
    .options {
        margin-left: 4rem;
    }
    .counter {
        width: 18px;
        height: 18px;
        line-height: 18px;
        border-radius: 9px;
        background-color: whitesmoke;
        margin: 5px 5px;
    }
    .counter .n-count {
        margin: auto;
    }
</style>