<script lang='ts'>
    import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
    import Fa from 'svelte-fa'

    let { objs } = $props()
    let index = $state(0)
    
    let loaded = $state(true)
    let sols = $state([])

    
    function load() {

    }

    function prev() {
      index = Math.abs(index - 1) % objs.length
    }
    function next() {
      index = Math.abs(index + 1) % objs.length
    }
</script>

<div class='carousel'>
  <button onclick={prev} disabled={!loaded} class='left'>
    <Fa icon={faArrowLeft} />
  </button>
  <article class='center'>
      <div class='thumbnail'>
        <img src={objs[index].image} />
      </div>
      <a role="button" href={"/teach/library/browse/" + objs[index].path} target="_blank">View Details</a>
  </article>
  <button onclick={next} disabled={!loaded} class='right'>
    <Fa icon={faArrowRight} />
  </button>
</div>
<style lang='scss'>
  @use "$lib/styles/theme.scss";
  .thumbnail {
    overflow: hidden;
    max-width: 24rem;
  }
  .thumbnail > img {
    object-fit: cover;
  }
  .card-title {
    font-family: theme.$title-font;
    font-size: 14pt;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .carousel {
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: flex-start;
    aspect-ratio: 8.5/11;
    position: relative;
    // background-color: pink;
  }
  .left, .right {
    color: black;
    flex: 0 1;
    margin: 0 0px;
    height: 100%;
    background-color: transparent;
    border-color: transparent;
    color: transparent;
    padding: 8px;
    align-items: center;
    position: absolute;
    &:hover {
      background-color: white;
      color: black;
    }
  }
  .right { right: 0; }
  .left { left: 0; }
  .center {
    margin: 0; 
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    a {
      font-size: small;
      padding: 4px;
      margin-top: 12px;
    }
    background-color: transparent;
  }
  ul {
    position: relative;
    right: 1rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  li {
    margin: 0;
    padding: 0;
  }
  .empty {
    text-align: center;
    p {
      margin-top: 4rem; 
      margin: 12px 0; 
    }
    button {
      background-color: white;
      color: black;
      font-size: 12pt;
      padding: 10px 1rem;
    }
  }
</style>

