<script lang='ts'>
  import Fa from 'svelte-fa'
  import { faFire, faLocationDot } from '@fortawesome/free-solid-svg-icons'
  let { obj } = $props()
  // const nodes = (obj.nodes.split('"')).length / 2

</script>
<article class='card'>
  <div class='card-body'>
    <h3>{obj.title}</h3>
    <p class='icons'>
      <span><Fa icon={faLocationDot} /> Rel. Projs</span>
    </p>
    <p>{obj.short}</p>
    <a class='select' role="button">Select in Map</a>
    <a role="button">Open in Tab</a>
    <a role="button">Save Tutorial</a>
    <a role="button">Mark Complete</a>
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
  .icons { position: absolute; top: 0; right: -6px;
    & > span {
    border: 1px solid grey;
    border-radius: 24px;
    padding: 8px;
    padding-bottom: 6px;
    }
  }
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
