<script lang='ts'>
  import MarkdownLesson from '$lib/components/MarkdownLesson.svelte'
  import ElementTable from '../../components/ElementTable.svelte'
  import PremiumCallout from '$lib/components/PremiumCallout.svelte'
  import { faBoltLightning } from '@fortawesome/free-solid-svg-icons'
  import { pushState, goto } from "$app/navigation"
  import Fa from 'svelte-fa'
  import { page } from '$app/state'
  import Breadcrumb from '$lib/components/Breadcrumb.svelte'
  import Pill from '$lib/components/Pill.svelte'
  import { getGradeStyle } from "$lib"
  import LockedElementCTAModal from '$lib/components/LockedElementCTAModal.svelte'
  import Standard from '$lib/components/Standard.svelte'

  let { data } = $props()
  const locked = data.element.locked
  const styles = '<style type="text/css">'+data.styles+'</style>'
  let s = "background-color: red;"

  function getRelatedCount() {
    // TODO: implement
    return "X"
  }
  const showThumbnail = true
</script>
<div class='element-view'>
  <aside class='info has-shadow'>
    <header>
      <div>
      {#if showThumbnail}
      <img class='thumbnail has-shadow' src={data.element.image} />
      {/if}
      <h1>{#if locked}<span><Fa icon={faBoltLightning} size="1.5" /></span>{/if}{data.element.title}</h1>
      <p class='subtitle'>by {data.element.authors}</p>
      <div class='stats'>
        <p>Grades: <Pill style={getGradeStyle(data.element) + " medium"}>{data.element.gradesAbbr}</Pill></p>
        <p>Subjects: {#each data.element.subjects as subj, i}<span>{i > 0 ? ", " + subj.abbr : subj.abbr}</span>{/each}</p>
      </div>
      </div>
      <p>{data.element.long}</p>
      {#if data.element.children?.length > 0}
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
                <tr class='child'>
                  <td><a href="/teach/library/browse/{row.path}">{#if row.locked}<span><Fa icon={faBoltLightning} /></span>{/if}{row.title}</a></td>
                  <td><Pill style={getGradeStyle(row)}>{row.gradesAbbr}</Pill></td>
                </tr>
              {/each}
            </tbody>
          </table>
          {/if}
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
            <td>{#each data.element.standards.filter((o) => o.subjectId == subj.id) as sol}<Standard obj={sol} />{/each}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </aside>
  <div class='doc'>
    {#if (locked || !data.user)}
      <div class='modal-wrap'>
        <LockedElementCTAModal obj={data.element} />
      </div>
    {/if}
    {#if data.element.children?.length > 0}
    <section class='children modal-wrap'>
      <h3>Search Items in This Group</h3>
      <ElementTable elements={data.children} filters={{...data.filters, text: true}} user={data.user} session={data.session} />
    </section>
    {:else if !data.element.link}
    <MarkdownLesson src={data.element.content} />
    {:else}
    <div id="{data.element.id}" class='doc-wrap'>
      <object type="application/pdf" data="/documents/test/test.pdf">
        <embed src="{data.element.link + "/pdf"}" type="application/pdf" >
      </object>
    </div>
    {/if}
  </div>
</div>

<style lang='scss'>
  @use "$lib/styles/theme.scss";
  .instructions {
    margin: 4rem auto;
    width: 38rem;
    a { width: 100%; }
  }
  .modal-wrap {
    margin: 4rem 10rem;
  }
  .doc-wrap {
    background-color: #transparent;
  }
  .element-view {
    display: flex;
    & > * {
      flex: 1;
    }
  }
  .info {
    overflow-y: scroll;
    padding: 2rem;
    flex: 1 1;
    min-width: 586px;
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
  .thumbnail {
    float: left;
    height: 7rem;
    margin: 0;
    margin-right: 2rem;
  }
  h1 > span, .child span { color: fuchsia; margin-right: 12px; }
</style>


