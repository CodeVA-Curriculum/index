<script lang='ts'>
  import { faBoltLightning } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
</script>
<article class='premium'>
  <div class='head'>
    <span><Fa icon={faBoltLightning} size=1.5x /></span>
    <h3>Become a Member!</h3>
  </div>
  <p>Access this resource by becoming a member or enrolling in a CodeVA educator PD course, then <a href="/account">log in</a>.</p>
  <div class='buttons'>
    <a class='primary-loc' role='button'>Learn More</a>
    <button>Purchase Options</button>
  </div>
</article>
<style lang='scss'>
  @use "$lib/styles/theme.scss";
  article { 
    padding: 1rem; 
    box-shadow: 0px 0px 38px 0px theme.$premium-light;
    border-color: fushcia;
    border-weight: 2px;
    margin: 2rem 0;
  }
  .head {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }
  .buttons * {
    background-color: white;
    color: theme.$text;
  }
  .buttons .primary-loc {
    background-color: theme.$premium;
    color: white;
  }
</style>
