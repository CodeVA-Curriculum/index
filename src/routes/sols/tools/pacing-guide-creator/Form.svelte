<script lang='ts'>
    import RichEditor from "./RichEditor.svelte";
    import 'quill/dist/quill.snow.css'
    const options = {
        theme: 'snow',
        placeholder: ''
    }

    let data = ''
    let text = ''
    let html = ''
</script>

<div class='unit-form'>
    <div class="columns is-tablet">
        <div class='column'>
            <label class="label">Unit Name</label>
            <div class="control is-expanded">
                <input class="input" type="text" placeholder="Type the unit title here...">
            </div>
        </div>
        <div class='column is-2'>
            <label class="label">Duration (Weeks)</label>
            <div class="control">
                <input class="input" type="number" value="1">
            </div>
        </div>
    </div>
      
    <div class='columns'>
        <div class="field column">
            <label class="label">Unit Description</label>
            <div class="control">
                <RichEditor {options} {data} />
            </div>
        </div>
        <div class="column">
            <label class='label'>SOLs Addressed in this Unit</label>
            <div class="field is-grouped">
                <div class="control is-expanded">
                    <span class="dropdown select is-fullwidth">
                        <select>
                            <option selected>Select grade level...</option>
                            <option>Kindergarten</option>
                            <option>Grade 1</option>
                        </select>
                    </span>
                </div>
                <div class="control is-expanded">
                    <span class="dropdown select is-fullwidth">
                        <select>
                            <option selected>Select subject area...</option>
                            <option>English</option>
                            <option>Mathematics</option>
                        </select>
                    </span>
                </div>
            </div>
            <div class='helper'>
                <p>-- Select a grade level and subject area above to add SOLs --</p>
            </div>
        </div>
    </div>
    
    <div class="field is-grouped">
        <div class="control">
            <button class="button is-link">Submit</button>
        </div>
        <div class="control">
            <button class="button is-link is-light">Cancel</button>
        </div>
    </div>
</div>

<style lang='scss'>
    input, select {
        border-radius: 0;
    }
    .unit-form {
        // border: 4px solid gray;
        padding: 2rem 2rem;
        // position: relative;
    }
    .top {
        & > label {
            position: absolute;
        }
    }
    .helper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 75px;
        font-style: italic;
        color: grey;
        // background-color: pink;
    }
</style>