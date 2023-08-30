<script lang='ts'>
    let url:string = '/'
    // TODO: Change the URL based on search parameters
</script>

<div class='searchbox my-5'>
    <div class='field has-addons'>
        <div class='control is-expanded'>
            <input class='input is-large' type='text' placeholder="Search for lessons...">
        </div>
        <div class='control'>
            <a href='{url}' class='button is-large is-primary'>Search</a>
        </div>
    </div>
</div>

<style>
    .searchbox {
        margin-right: auto;
        margin-left: auto;
        /* padding: 0 0; */
    }
</style>