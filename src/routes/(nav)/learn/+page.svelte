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
      <div>
      <article class='card'>
        <div class='card-image'>
          <img src={guide.image} alt="" />
        </div>
        <main class='card-body'>
          <h2>{guide.title}</h2>
          <p>{guide.short ? guide.short : "No description provided!"}</p>
          <a role='button' href=''>Open the Guide</a>
        </main>
      </article>
      </div>
    {/each}
  </section>
</div>

<style lang='scss'>
  article {
    max-width: 70%;
    padding: 1.5rem;
    display: inline-flex;
    flex-direction: row;
    min-width: 400px;
  }
  .card-image {
    flex: 1 1;
    margin-right: 2rem;
    max-width: 200px;
    img { aspect-ratio: 1/1; min-width: 200px; height: 200px; }
  }
  main {
    // flex: 1 0;
    // margin: 0 1.5rem;
  }
  .guide-cards {
    // display: inline-flex;
    // flex-direction: column;
  }
</style>
