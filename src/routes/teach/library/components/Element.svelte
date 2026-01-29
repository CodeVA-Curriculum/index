<script lang='ts'>
  import Help from '$lib/components/Help.svelte'
</script>
<article class='card'>
  <div class='grade-tab'>
    <span>KINDERGARTEN</span>
  </div>
  <div class='thumbnail'>
    <img src="https://placecats.com/850/1100" >
  </div>
  <div class='body'>
    <h3>Element Title</h3>
    <p>A short description of the resource, about 1 line long.</p>
    <span>items: 8</span>
  </div>
  <div class='stats'>
      <span>Type: Lesson Plan (1h) <Help /></span>
      <span>subj: 4</span>
      <span>sols: 3</span>
  </div>
  <div class='buttons'>
    <a role='button' href="TODO:">open</a>
    <button>save</button>
  </div>
</article>

<style lang='scss'>
  article { margin: 0; padding: 0; &:hover { cursor: auto; } }
  .card {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-right: 1rem;
  }
  .body, .stats, .buttons, .thumbnail {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    margin-left: 1rem;
  }
  .thumbnail { flex-shrink: 1; flex-basis: 100px; align-items: center; }
  .thumbnail > img { height: 100%; width: auto; }
  .body {
    // background-color: lightcyan;
    flex-grow: 2;
  }
  .stats {
    // background-color: lightgreen;
    flex-grow: 1;
  }
  .buttons {
    // background-color: powderblue;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    * { width: 240px; margin: 0rem 0; flex-grow: 1; margin-bottom: 0.8rem; }
    *:last-child {
      margin-bottom: 0;
    }
  }
  .grade-tab {
    display: flex;
    flex-direction: column;
    background-color: pink;
    justify-content: center;
    align-items: center;
    width: 2rem;
    padding: 0 1rem;
    & > span {
      transform: rotate(-90deg);
      font-weight: bolder;
      white-space: nowrap;
      z-index: 0;
    }
  }
</style>
