<div class='map-view'>
</div>

<div class='ui'>
  <div class='start'>
  <button>projects</button>
  <button>tutorials</button>
  <button>backpack</button>
  </div>
  <div class='end'>
    <button>export</button>
    <button>import</button>
  </div>
</div>

<style lang='scss'>
  .ui {
    height: 90%;
    position: fixed;
    background-color: red;
    top: 4rem;
    left: 1.25rem;
    display: flex;
    flex-direction: column;
    .start {
      flex-grow: 1;
      display: flex; flex-direction: column;
      background-color: lightgreen;
      justify-content: start;
    }
    .end {
      flex-grow: 1;
      display: flex; flex-direction: column;
      background-color: pink;
      justify-content: end;
    }
    button {
      margin: 1rem 0;
    }
  }
  .map-view {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: powderblue;
    width: 100vw;
  }
</style>
