<script lang='ts'>

  import { pushState, goto } from "$app/navigation"
  import { page } from '$app/state'
  import Breadcrumb from '$lib/components/Breadcrumb.svelte'
  import Pill from '$lib/components/Pill.svelte'
  import { getGradeStyle } from "$lib"
  import LockedElementCTAModal from '$lib/components/LockedElementCTAModal.svelte'
  let { data } = $props()
  const styles = '<style type="text/css">'+data.styles+'</style>'
  let s = "background-color: red;"
 // href={row.path.includes("/meta.md") ? "/teach/library/browse/" + row.path : '?view=' + row.path} console.log(data.element.children)

  const locked = getLocked(data.element, data.user)
  
  function getLocked(user, element) {
    return true;
  }
  function getRelatedCount() {
    // TODO: implement
    return "X"
  }
</script>
<div class='element-view'>
  <aside class='info'>
    <header>
      <h1>{data.element.title}</h1>
      <p class='subtitle'>by {data.element.authors}</p>
      <p>{data.element.short}</p>
      <div class='stats'>
        <p>Grades: <Pill style={getGradeStyle(data.element) + " medium"}>{data.element.gradesAbbr}</Pill></p>
        <p>Subjects: {#each data.element.subjects as subj}<span>{subj.abbr}</span>{/each}</p>
      </div>
          <table class='related'>
            <colgroup>
              <col>
              <col>
            </colgroup>
            <thead>
              <tr>
                <th class='title' scope="col">Title</th>
                <th scope="col">Grades</th>
              </tr>
            </thead>
            <tbody>
              {#each data.element.children as row}
                <tr>
                  <td><a href="/teach/library/browse/{row.path}">{row.title}</a></td>
                  <td><Pill style={getGradeStyle(row)}>{row.gradesAbbr}</Pill></td>
                </tr>
              {/each}
            </tbody>
          </table>
    </header>
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
  <div class='doc'>
    {#if locked}
      <div class='modal-wrap'>
        <LockedElementCTAModal obj={data.element} />
      </div>
    {/if}
    <div id="{data.element.id}" class='doc-wrap'>
      <object type="application/pdf" data="/documents/test/test.pdf">
        <embed src="/documents/test/test.pdf" type="application/pdf" >
      </object>
    </div>
  </div>
</div>

<style lang='scss'>
  @use "$lib/styles/theme.scss";
  .modal-wrap {
  margin: 0;
    padding: 8rem;
    position:absolute;
    z-index: 90;
  }
  .doc-wrap {
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
    background-color: #transparent;
  }
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
  .doc {
    flex: 2 1;
  }
  object, embed {
    margin: 0 0;
    width: 100%;
    height: 86vh;
    z-index: -99;

  }
  .stats {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 1rem;
  }
  header {
    margin-bottom: 2rem;
  }
  table {
    font-size: 12pt;
  }
  table.related {
    @import "$lib/styles/table";
    @include hoverable;
  }
</style>


