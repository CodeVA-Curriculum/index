<script lang='ts'>
  import type { PageProps } from './$types'
  let { data }:PageProps = $props();
</script>

<div class='container'>
  <section>
    <h1>Learn Computer Science</h1>
    <p>Our computing resources are designed for you to use, reuse, and misuse. Check them out!</p>
  </section>
  <section>
    {#each data.guides as guide}
      <article class='card'>
        <div class='img-wrap'>
          <img src={guide.image} alt="" role="presentation" />
        </div>
        <main class='card-body'>
          <h2>{guide.title}</h2>
          <p class='description'>{@html guide.description}</p>
          <a role='button' href=''>Open the Guide</a>
        </main>
      </article>
    {/each}
  </section>
</div>

<style lang='scss'>
  article {
    display: flex;
    flex-direction: row;
    padding: 1.5rem;
  }
  main {
    display: flex;
    flex-direction: column;
    p { flex-grow: 1; }
    margin: 0 1.5rem;
  }
  .img-wrap {
    min-width: 220px;  
    max-width: 220px;
  }
</style>
