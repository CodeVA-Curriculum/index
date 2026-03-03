<script lang='ts'>
  let { obj } = $props()
</script>

<article class='card'>
  <div class='card-body'>
    <h3>{obj.title}</h3>
    <p class='diff'>
      <span>Com/Locs</span>
      <span>{obj.difficulty}</span>
      <span></span>
    </p>
    <p>{obj.short}</p>
    <a class='select' role="button">Select in Map</a>
    <a role="button">Save to Backpack</a>
    <a role="button">Open in New Tab</a>
  </div>
</article>

<style lang='scss'>
  .card-body {
    position: relative;
  }
  @import "$lib/styles/theme.scss";
  a {
    background-color: white;
    color: $text;
    &.select { background-color: $dark-blue; color: white;  }
  }
  h3 {
    font-size: 18pt;
  }
  a {
    padding: 10px;
    font-size: $small;
  }
  .diff { position: absolute; top: 0; right: 0; }
  .number-pill {
    display: inline-flex;
    background-color: lightgray;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    font-weight: bold;
    margin: 0 0.5rem;
  }
</style>
