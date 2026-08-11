<script lang='ts'>
  import Fa from 'svelte-fa'
  import { faBoltLightning } from '@fortawesome/free-solid-svg-icons'
  let { obj, children, close } = $props()
  let va = false

</script>

<article>
  <header>
    <h1><span class='picon'><Fa icon={faBoltLightning} size="1x" /></span>Purchase Access to this Resource!</h1>
  </header>
  <p><i><a href="/teach/library/browse/{obj.path}">{obj.title}</a></i> is available for download to paid subscribers{va ? " and Virginia educators" : ""}. If you'd like more information about this lesson or our other resources before purchasing access, please contact us so we can help!</p>
  <p>We have many resources available for free. <a href="/teach/library/search">Click this link to browse them!</p>
  <footer>
    <a href="TODO" class='pbutton' role="button">Purchase Access</a>
    <a href="/account/login" class='secondary' role="button">Log In</a>
    <a href="https://codevirginia.org" class="secondary" role="button">Contact Us</a>
  </footer>
</article>

<style lang='scss'>
  @use "$lib/styles/theme.scss";
  h1 {
    font-size: 24pt;
    margin: 0;
  }
  .picon {
    margin-right: 12px;
    color: theme.$premium-light;
  }
  .pbutton {
    background-color: theme.$premium-light;
    border-color: transparent;
  }
</style>
