<article class='card'>
  <div class='grade-tab'>
    grade 9
  </div>
  <div class='body'>
    <h3>Element Title</h3>
    <div class='stats'>
      <span>items: 8</span>
      <span>subj: 4</span>
      <span>sols: 3</span>
    </div>
  </div>
  <div class='buttons'>
    <a role='button' href="TODO:">open</a>
    <button>save</button>
  </div>
</article>

<style lang='scss'>
  .card, .stats {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .buttons {
    display: flex;
    flex-direction: column;
  }
  .body {
    flex-grow: 1;
  }
</style>
