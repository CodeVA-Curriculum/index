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
  const materials = JSON.parse(data.element.materials)
  const showThumbnail = true

  let view = $state(data.element)
  console.log(data.element)

  $effect(() => {
    let p = page.url.searchParams.get('view')
    if(p && p.length > 0) {
      let [res] = data.children.filter((o) => o.path == p)
      if(res) { view = res } else { view = data.element }
    } else {
      view = data.element
      console.log("loaded self")
    }
  })
</script>


{#snippet document(obj)}
  <div class='doc'>
    {#if obj.locked }
      <div class='modal-wrap'>
        <LockedElementCTAModal obj={obj} />
      </div>
    {:else}
    <MarkdownLesson obj={obj} />
    {/if}
    {#if data.children?.length > 0 && (obj.locked || !page.url.searchParams.get('view')) }
    <section class='children modal-wrap'>
      <h3>Search Items in This Group</h3>
      <ElementTable navTo={(path) => "/teach/library/browse/"+data.element.path+'?view='+path} elements={data.children} filters={{...data.filters, text: true}} user={data.user} session={data.session}
       />
    </section>
    {/if}
  </div>
{/snippet}

  
<div class='element-view'>
  <aside class='info'>
    <header>
      <div>
      {#if showThumbnail}
      <img class='thumbnail has-shadow' src={data.element.image} />
      {/if}
      <h1>{#if locked}<span><Fa icon={faBoltLightning} size="1.5" /></span>{/if}{data.element.title}</h1>
      <div class='stats'>
        <div><span>Grades:</span><Pill style={getGradeStyle(data.element) + " medium"}>{data.element.gradesAbbr}</Pill></div>
      <div><span>Subjects:</span><div class='tags'>{#each data.element.subjects as subj, i}<span class='tag'>{subj.abbr}</span>{/each}</div></div>
      </div>
      </div>
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
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody class='child-rows'>
              {#each data.element.children as row,i}
                <tr class='child {row.path == view.path ? "selected" : "deselected"}'>
                  <td><a href="/teach/library/browse/{data.element.path}?view={row.path}">{#if row.locked}<span><Fa icon={faBoltLightning} /></span>{/if}{row.title}</a></td>
                  <td><Pill style={getGradeStyle(row)}>{row.gradesAbbr}</Pill></td>
                  <td><a class='close' href='/teach/library/browse/{data.element.path}'>Close</a></td>
                </tr>
              {/each}
            </tbody>
          </table>
          {/if}
    </header>
    <p class='description'>{data.element.long}</p>
    <h2>Subjects & Standards</h2>
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
            <td>
              <div class='tags'>
              {#each data.element.standards.filter((o) => o.subjectId == subj.id) as sol}
                <Standard obj={sol} />
              {/each}
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </aside>
  {@render document(view)}

</div>

<style lang='scss'>
  @use "$lib/styles/theme.scss";
  .instructions {
    margin: 4rem auto;
    width: 38rem;
    a { width: 100%; }
  }
  .doc-wrap {
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
    position: relative;
    overflow-y: scroll;
    padding: 2rem;
    flex: 1 1;
    min-width: 586px;
  }
  .doc {
    background-color: whitesmoke;
    padding: 4rem;
    overflow-y: scroll;
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
    font-size: 14pt;
    justify-content: flex-start;
    gap: 12px;
    * {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: 8px;
    }
  }
  header {
    min-height: 7rem;
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
  .tags {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 4px;
  }
  .close {
    visibility: hidden;
  }
  .selected {
    background-color: whitesmoke;
    border: 4px solid theme.$highlight-blue;
    .close { visibility: visible }
  }
</style>
