<script lang='ts'>
  import type { PageProps } from './$types'
  let { data }:PageProps = $props();
</script>

<div class='container'>
  <section>
    <h1>Learn Computer Science</h1>
    <p>Our computing resources are designed for you to use, reuse, and misuse. Check them out!</p>
  </section>
  <section class='guide-cards'>
    {#each data.guides as guide}
      <article class='card'>
        <div class='card-image'>
          <img src='/images/{guide.image}' alt="" />
        </div>
        <main class='card-body'>
          <h2>{guide.title}</h2>
          <a role='button' href="/learn/{guide.path.replace("/meta.md", "")}">Open the Guide</a>
        </main>
      </article>
    {/each}
  </section>
</div>

<style lang='scss'>
  .card-image {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .card {
    a { width: 100%; }
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .guide-cards {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 20px;
    & > * {
      min-width: 14rem;
      flex: 0 1;
    }
  }
  .card-image {
    flex: 1;
    img { aspect-ratio: 1/1; min-width: 200px; height: 200px; }
  }
</style>
