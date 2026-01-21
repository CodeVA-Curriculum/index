<script lang='ts'>
  import Fa from 'svelte-fa'
  import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
  import { getFilter, filterFrontmatter, renderGradesAsIndices } from './util';
  import { page } from '$app/stores'

  let { sols, elements } = $props()

  let lessons = $state([])
  let loaded = $state(false)
  let position = $state(0)

  async function load() {
    let params = new URLSearchParams()
    for(let i=0;i<sols.length;i++) {
      params.append("sol", sols[i])
    }
    let filter = await getFilter(params, elements.meta)
    const res = await filterFrontmatter(filter, elements.frontmatters)
    lessons.push(...res.results)
    loaded = true
  }
  function next() {
    position++
    if(position > lessons.length-1) { position = 0 }
    console.log(position)
  }
  function prev() {
    position--
    if(position < 0) {position = lessons.length-1}
    console.log(position)
  }
</script>
<div class='carousel'>
  <button onclick={prev} disabled={!loaded} class='left'>
    <Fa icon={faArrowLeft} />
  </button>
  <article class='center'>
      {#if !loaded}
      <div class='empty'>
        <button disabled={sols.length == 0} onclick={load}>Load Resources</button>
        <p>Select standards, then click above to search!</p>
      </div>
      {:else}
      <div class='thumbnail'>
        <img src="https://curriculum.codevirginia.org/thumbnails/1_NNnWXrd5p8tU29M0L1M_lBuXGGJXRczbqOvGy-ZsOQ.png" />
      </div>
          <div class='info'>
            <span class='card-title'>{lessons[position].title}</span>
            <!-- <p>{@html lessons[0].content.replaceAll("<h2>Summary</h2>", "").replaceAll("<h2>Overview</h2>", "")}</p> -->
            <p>Check out this lesson from CodeVA!</p>
            <!-- <ul>
              <li><strong>Grade: </strong> {lessons[0].grades}</li>
              <li><strong>Subjects: </strong> {lessons[0].subjects}</li>
              <li><strong>SOLs: </strong> {lessons[0].standards}</li>
            </ul> -->
            <a role="button" href="{lessons[position].links.drive}" target="_blank">View Details</a>
          </div>
    {/if}
  </article>
  <button onclick={next} disabled={!loaded} class='right'>
    <Fa icon={faArrowRight} />
  </button>
</div>
<style lang='scss'>
  @use "$lib/styles/theme.scss";
  .thumbnail > img {
    width: 100px;
  }
  .card-title {
    font-family: theme.$title-font;
    font-size: 14pt;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .info {
    display: flex;
    flex-direction: column;
    font-size: 12pt;
    a {
      font-size: 12pt;
      padding:6px;
      margin: 0;
      width: 100%;
      flex-grow: 0;
    }
    p {
      margin-bottom: 12px;
      flex-grow: 1;
      overflow-y: hidden;
      max-height: 4rem;
      -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
      mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    }
    margin-left: 1rem;
    // background-color: pink;
  }
  .carousel {
    display: flex;
    // flex-direction: row;
    // background-color: pink;
  }
  .left, .right {
    display: flex;
    color: black;
    flex-grow: 0;
    margin: 0 0px;
    background-color: white;
    color: black;
    padding: 0 10px;
    align-items: center;
  }
  .center {
    display: flex;
    margin: 0 10px;
    flex-grow: 0;
    // background-color: powderblue;
    // min-width: 200px;
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

