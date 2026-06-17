<script lang='ts'>
  import PhotoCarousel from '$lib/components/PhotoCarousel.svelte';
    import { faSearch } from '@fortawesome/free-solid-svg-icons';
  import SearchBar from './components/SearchBar.svelte'
  import Fa from 'svelte-fa'

  let { data } = $props()

</script>
<div class='container page'>
  <section class='text-and-carousel'>
    <div class='photo'>
      <PhotoCarousel />
    </div>
    <div class='info'>
      <div class='text'>
      <h1>CodeVA Educator's Library</h1>
      <p>We've written dozens of lessons and created tons of resources to help K-12 educators teach computer science. <a href="/teach/library/search"<>Search the free materials</a>, or subscribe to access the whole library!</p>
      <SearchBar filters={true} />
      <p class='asearch'><i><a href="/teach/library/search">Advanced Search</a></i></p>
      </div>
    </div>
    </section>
  <section>
    <h2>Browse Collections</h2>
    <div class='collections'>
      {#each data.collections as collection}
      <article>
        <img src="https://placecats.com/200/100">
        <h4>{collection.title}</h4>
        <p>{collection.short}</p>
        <div class='buttons'>
          <a role="button" href="/teach/library/browse/{collection.element.path}">View Collection</a>
        </div>
      </article>
      {/each}
    </div>
  </section>
</div>

<style lang='scss'>
.collections {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
  article {
    width: 12rem;
    h4 { margin-top: 1rem; }
    img { width: 100%; }
    button { width: 100%; }
  }
}
  .text-and-carousel {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .photo {
    max-width: 25%;
  }
  .info {
  display: flex;
  flex-direction: column;
    min-width: 600px;
    margin-left: 1rem;
    .text { flex: 1 1;}
  }
  .page {
    width: 1024px;
  }
  .text p {
    margin-bottom: 2rem;
  }
  .asearch {
    margin-top: 12px;
    float: right;
  }
</style>
