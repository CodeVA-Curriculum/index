<script lang='ts'>
	import { enhance } from '$app/forms';
  import Fa from 'svelte-fa'
  import { faChartLine, faTrash, faRefresh, faPowerOff } from'@fortawesome/free-solid-svg-icons'
  let { code } = $props()
  const noReset = () => {  
    return async ({ update }) => {  
      update({ reset: false });  
    };  
  }
</script>
<article>
  <p><a href="/account/{code.alias}">{code.alias}</a></p>
  <div class='code-status-pill'>
    <span class='tag {code.active ? "active" : "inactive"}'>{code.active ? "Active" : "Inactive"}</span>
  </div>
  <footer>
    <div class='buttons'>
      <form method="POST" action="/account?/power" use:enhance={noReset}>
        <input type="text" name="id" value={code.id} >
        <input type="text" name="status" value={!code.active} >
        <button type="submit">
          <Fa size="0.75x" icon={faPowerOff} />
        </button>
      </form>
      <a href="/account/{code.alias}" role='button'>
        <Fa size="0.75x" icon={faChartLine} />
      </a>
      <form method="POST" action="/account?/delete" use:enhance={noReset}>
        <input type="text" name="id" value={code.id} >
        <button class='danger' type="submit">
          <Fa size="0.75x"icon={faTrash} />
        </button>
      </form>
    </div>
  </footer>
</article>
<style lang='scss'>
  @use "$lib/styles/theme.scss";
    article { padding-top: 8px; }
    p {
      font-size: 200%;
      font-weight: bold;
      padding: 0;
      margin: 0;
      a { color: theme.$text; text-decoration: none;}
    }
    div {
      display: flex;
      margin-bottom: .5rem;
      & * { flex: 1; }
      .active { background-color: theme.$highlight-green; }
      .inactive { background-color: theme.$orange; }
    }
  .buttons {
    gap: 4px;
    input { display: none;}
    a, button {
      padding: 0;
      margin: 0;
    }
  }
  .code-status-pill {
    justify-content: center;
    align-items: center;
  }
</style>
