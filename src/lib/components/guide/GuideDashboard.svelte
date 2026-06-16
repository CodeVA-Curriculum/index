<script lang='ts'>
  let { session, user } = $props()
  let codes = [ 0, 0, 0]
</script>
<div class='guide-dashboard'>
  <h1>Hi, {user.username}!</h1>
  <div class='create-code'>
    <p>Create a class access code:</p>
    <form method='POST' action="?/code">
      <fieldset role='group'>
        <input id="code" type="text" name="code" value="XXX">
        <input type="submit" value="Create Code">
      </fieldset>
    </form>
  </div>

  <p>Active Class Access Codes:</p>
  <div class='access-cards'>
    {#each codes as code}
      <article>
        <footer>
          <div class='buttons'>
            <form method="POST">
              <input type="submit" value="Deactivate">
            </form>
            <form method="POST">
              <input class='danger' type="submit" value="Delete">
            </form>
          </div>
        </footer>
      </article>
    {/each}
  </div>
</div>
<style lang='scss'>
  .create-code {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
</style>
