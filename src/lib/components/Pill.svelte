<script lang='ts'>
  let { children } = $props()
</script>

<span class='pill'>
  <span>{@render children()}</span>
</span>

<style lang='scss'>
@use "$lib/styles/theme.scss";
  .pill {
    display: inline-block;
    margin: auto auto;
    text-align: center;
    color: white;
    width: 1rem;
    height: 1rem;
    // background-color: theme.$dark-blue;
    background-color: theme.$dark;
    border-radius: 40px;
    position: relative;
    top: -2px;
    margin: 0 0.5rem;
    & > span {
      position: relative;
      top: 1px;
    }
  }
</style>
