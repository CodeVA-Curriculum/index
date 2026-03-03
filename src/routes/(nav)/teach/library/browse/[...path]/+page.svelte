<script lang='ts'>
  let { data } = $props()
  const styles = '<style type="text/css">'+data.styles+'</style>'
  let s = "background-color: red;"
</script>
<div class='element-view'>
  <aside class='info'>
    <heading>
      <h1>{data.element.title}</h1>
      <p class='subtitle'>by {data.element.authors}</p>
    </heading>
    <p class='description'>{data.element.long}</p>
    <h2>Standards</h2>
    <table>
      <colgroup>
        <col class='narrow'>
        <col>
      </colgroup>
      <thead>
        <tr>
          <td scop="col">Subject</td>
          <td scop="col">SOLs</td>
        </tr>
      </thead>
      <tbody>
        {#each data.element.subjects as subj}
          <tr>
            <td>{subj.title}</td>
            <td>Lorem ipsum</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </aside>
  <main id="XXX" class='doc'>
    <object type="application/pdf" data="/documents/test/test.pdf">
      <embed src="/documents/test/test.pdf" type="application/pdf" >
</object>

  </main>
</div>

<style lang='scss'>
  .element-view {
    overflow-y: hidden;
    display: flex;
    & > * {
      flex: 1;
    }
  }
  .info {
    overflow-y: scroll;
    padding: 2rem;
    flex: 1 1;
  }
  .doc { flex: 2 1; }
  object, embed {
    margin: 1rem 0;
    width: 100%;
    height: 86vh;
  }
</style>

