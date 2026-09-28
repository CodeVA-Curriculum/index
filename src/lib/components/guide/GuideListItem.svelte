<script lang='ts'>
  let { guide, long=false } = $props()
  import Fa from 'svelte-fa'
  import { faUser, faRoute, faLocationDot } from '@fortawesome/free-solid-svg-icons'
</script>

<article class='card'>
  <div class='card-image'>
    <img src='/images/{guide.image}' alt="" class:long />
  </div>
  <main class='card-body'>
    <h2><a href="/learn/{guide.path.replace("/meta.md", "")}">{guide.title}</a></h2>
    {#if long}
    <p>{guide.long ? guide.long : "No description provided!"}</p>
    {:else}
    <a role='button' class='{long ? "long" : "short"}' href="/learn/{guide.path.replace("/meta.md", "")}">Open the Guide</a>
    {/if}
  </main>
  {#if long}
  <div class='stats'>
    <div><Fa icon={faUser} /> {99}</div>
    <div><Fa icon={faRoute} /> {4} / {10}</div>
    <div><Fa icon={faLocationDot} /> {99} / {100}</div>
  </div>
  {/if}
</article>
<style lang='scss'>
@use "$lib/styles/theme.scss";
    article {
      gap: 1rem;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      flex: 0 1;
      // max-width: 40rem;
    }
    .card-image {
      flex: 0 1;
      justify-content: center;
      img { aspect-ratio: 1/1;  min-width: 200px; margin: 0;  }
      img.long { min-width: 5rem; }
    }
  .card-body {
    display: flex;
    flex-direction: column;
    flex: 1; 
    & > * { flex: 0 1 }
    h2 { white-space: nowrap; font-size: 18pt; }
    p { font-size: 14pt; }
    a { margin-top: auto; }
  }
  .card-body > p {
    flex: 1 0;
  }
  .buttons {
    display: flex;
    flex-direction:row;
    gap: 4px;
    justify-content: center;
  }
  $stat-gap: 2rem;
  h2 a { text-decoration: none; color: theme.$text; }
  .stats {
    display: flex;
    flex-direction: row;
    gap: $stat-gap;
    & > * { color: gray; flex: 1; white-space: nowrap; }
    margin-right: $stat-gap / 2;
  }

  // a { white-space: nowrap; }
</style>
