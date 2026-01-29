<script lang='ts'>
  let open = $state(false);
  function toggle() {
    open = !open;
    console.log("toggling...")
  }
</script>
<div class='panel'>
  <button onclick={toggle}>></button>
  <div class='body {open ? 'open' : 'closed'}'>
    <p>Data View for Standards & Elements</p>
  </div>
</div>

<style lang='scss'>
  .panel {
    display: flex; flex-direction: row; align-items: stretch; position: sticky;height: 100vh; top: 0;

  }
  .body {
    &.open { width: 30rem; }
    &.closed { width: 0rem; }
    -webkit-transition: width 0.25s ease-in-out;
    -moz-transition: width 0.25s ease-in-out;
    -o-transition: width 0.25s ease-in-out;
    transition: width 0.25s ease-in-out;
    overflow: hidden;
  }
  button {
    height: 100%;
  }
</style>
