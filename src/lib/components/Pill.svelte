<script lang='ts'>
  let { children, style} = $props()
  // let classes = style.split(" ")
  // let gradeStyle = (classes.filter((s) => ["gk12", "gk2", "g35", "g68", "g912"].includes(s)))[0]
</script>

<span class={"pill " + style}>
  <span>{@render children()}</span>
</span>

<style lang='scss'>
  @use "$lib/styles/theme.scss";
  .pill {
    @import "$lib/styles/grades";
    @include gradeStyles;
    display: inline-block;
    text-align: center;
    color: white;
    min-width: 1rem;
    position: relative;
    background-color: theme.$dark;
    border-radius: 40px;
    margin: 0 0;
    font-size: 11pt;
    & > span {
    overflow-x:hidden;
    white-space:nowrap;
      position: relative;
      top: 1px;
      padding: 4px;
    }
  }
  .medium { font-size: 14pt; }
  .pill.light { background-color: gray; color: white; }
</style>
