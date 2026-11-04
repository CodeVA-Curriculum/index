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
  $SMALL: 11pt;
  $MED: 14pt;
  $LARGE: 18pt;
  $SIZE: $SMALL;

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
    font-size: $SIZE;
    & > span {
    overflow-x:hidden;
    white-space:nowrap;
      position: relative;
      top: 1px;
      padding: $SIZE / 2;
      line-height: $SIZE * 1.5;
    }
  }
  .pill.light { background-color: gray; color: white; }
  .pill.medium {
    font-size: $MED;
    & > span {
      padding: $MED/ 2;
      line-height: $MED * 1.5;
    }
  }
  .pill.large{
    font-size: $LARGE;
    & > span {
      padding: $LARGE/ 2;
      line-height: $LARGE* 1.5;
    }
  }
</style>
