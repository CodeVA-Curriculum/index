<script>
    import { faSliders} from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'
</script>
<div class='search'>
<form>
  <fieldset role="group">
    <input type="text" />
    <button><Fa size=1.0x icon={faSliders} /> <span>Filters</span></button>
    <input class='search-button' type="submit" value="Search" />
  </fieldset>
</form>
</div>

<style lang='scss'>
  .search {
    display: flex;
    flex-direction: row;
  }
  form { flex: 1; }
  .search-button { width: 260px; }
  button { display: flex;
    justify-content: center;
    align-items: center;
    background-color: white; color: black;
    * { margin-left: 0.5rem; &:first-child { margin-left: 0; } }
  }
</style>
