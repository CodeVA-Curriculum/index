<script lang='ts'>
  import { dashboardURL } from '$lib'
  let { data, children } = $props()
</script>
<div class='account'>
{#if data.user && data.session}
<aside>
  <nav>
    <p>Hub Settings</p>
    <hr>
    <ul>
      <li><a href='/account'>Manage Library Access</a></li>
      <li><a href={dashboardURL} target="_blank">Professional Learning Portal</a></li>
      <li>
        <form method="POST" action='/account?/logout'>
          <button>Sign Out</button>
        </form>
      </li>
    </ul>
  </nav>
</aside>
{/if}
<div class='container'>
  {@render children() }
</div>
</div>
<style lang='scss'>
.account {
  display: grid;
  grid-template-columns: auto auto auto;
}
  aside {
    margin-right: 3rem;
    height: 100%;
    border-right: 1px solid whitesmoke;
    box-shadow: 5px 5px 5px 0px grey;
    overflow-y: hidden;
    max-width: 18rem;
    padding: 2rem;
    gap: 1rem;
  }
</style>
