<script lang='ts'>
  let { session } = $props();
  const key = 'V5QLBdKt5AYPU5Y7iMcDa5lQ1PLYYq7EdxfgjCP1sWcih1TGIl8vAYOLa7-vVr69dX_MNZirOMjUojYPd_4-BQ'
</script>
<nav>
  <ul>
    <li><img src="/images/wordmark.png"></li>
  </ul>
  <ul>
    <li><a href="/teach">Teach</a></li>
    <li><a href="/learn">Learn</a></li>
    <li><a href="/teach/library">Library</a></li>
    <li>
      {#if session}
        <a href="https://portal.codevirginia.org/dashboard">My Account</a>
      {:else}
      <form action="https://portal.codevirginia.org/auth/redirect?redirect_url=http://localhost:5173/login" method='POST'>
        <input style="display:none;" name="secret_key" id="secret_key" value={key}>
        <input type="submit" value="Log In">
      </form>
      {/if}
    </li>
  </ul>
</nav>

<style lang='scss'>
  @import "$lib/styles/media-queries.scss";
  nav {
    flex-grow: 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    padding: 0 1rem;
  }
  img {
    width: auto;
    height: 36px;
    @include xs { height: 22px; }
  }
</style>
