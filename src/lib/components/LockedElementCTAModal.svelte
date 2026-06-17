<script lang='ts'>
  let { obj, children, close } = $props()
  let va = false

</script>

<article>
  <header>
    <h1>Purchase Access to this Resource!</h1>
  </header>
  <p><i><a href="/teach/library/browse/{obj.path}">{obj.title}</a></i> is available for download to paid subscribers{va ? " and Virginia educators" : ""}. If you'd like more information about this lesson or our other resources before purchasing access, please contact us so we can help!</p>
  <p>We have many resources available for free. <a href="TODO:">Click this link to browse them!</p>
  <footer>
    <a href="TODO" class='primary' role="button">Subscribe</a>
    <a href="/account/login" class='secondary' role="button">Log In</a>
    <a href="TODO" class="secondary" role="button">Contact Us</a>
  </footer>
</article>

<style lang='scss'>
  h1 {
    font-size: 24pt;
    margin: 0;
  }
</style>
