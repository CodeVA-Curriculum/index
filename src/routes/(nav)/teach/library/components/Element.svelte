<script lang='ts'>
  import Pill from '$lib/components/Pill.svelte'
  import Fa from 'svelte-fa'
  // import type { Element } from '$lib/server/db/schema'
  import FilterAnchorPill from '$lib/components/FilterAnchorPill.svelte';
import Help from '$lib/components/Help.svelte'
    import { dbObjTitles } from '$lib/utils';
    import { faBookmark, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

  let { obj } = $props()
</script>
<article class='card'>
  <div class='grade-tab'>
    <span>{#if obj.grades.length > 1}GRADES {/if} {obj.gradesAbbr}</span>
  </div>
  <div class='thumbnail'>
    <img src="https://placecats.com/850/1100" >
  </div>
  <div class='body'>
    <h3>{obj.title}</h3>
    <p class='subtitle'>A {obj.gradesAbbr} {obj.types[0].title}</p>
    <p>{obj.short}</p>
    <details>
      <summary>
        <i>View Items in {obj.types[0].title}</i>
        <Pill>{obj.children.length}</Pill>
      </summary>
      <ol>
        {#each obj.children as child}
          <li><a href={child.path}>{child.title}</a></li>
        {/each}
      </ol>
    </details>
  </div>
  <div class='stats'>
    <div class='subjects'>
      <span>Subjects:</span>
      {#each obj.subjects as subj}
        {#if subj.abbr != 'CS'}
      <span class='tag light'>{subj.abbr}</span>
      {/if}
      {/each}      
    </div>
    <div class='sols'>
      <span>SOLs:</span>
      {#if obj.standards.length > 15}
      {obj.standardsAbbr}
      {:else}
      {#each obj.standards as s}
        <span class='tag light'>{s.abbr}</span>
      {/each}
      {/if}
    </div>
    <div class='tags'>
      Tags:
    </div>
  </div>
  <div class='buttons'>
    <a role='button' href="browse/{obj.path}"><span>Open </span><Fa icon={faFolderOpen} /></a>
    <a role='button'><span>Save </span><Fa icon={faBookmark} /></a>
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
    h3 {
      margin-bottom: 0;
    }
    p.subtitle {
      margin: 8px 0;
      margin-bottom: 0.75rem;
      font-size: 11pt;
    }
  }
  .thumbnail { flex: 1; align-items: center; }
  // .thumbnail > img { width: 180px; }
  .body {
    flex: 2 0 30%;
    padding-bottom: 0;
    details {
      margin-bottom: 2px;
    }
  }
  .stats {
    flex: 1;
    border-left: 1px solid whitesmoke;
    padding-left: 12px;
    font-size: 11pt;
    flex-direction: column;
    gap: 0;
    min-width: 120px;
    max-width: 240px;
    * {
      margin: 0 0;
      padding: 0 0;
      font-style: italic;
      flex: 1;
      display: inline-block;
    }
  }
  .buttons {
    align-items: center;
    display: flex;
    flex: 1;
    flex-direction: column;
    span {
      font-size: 18pt;
    }
    a { gap: 20px; display: flex; flex: 1; width: 160px; margin: 0rem 0; justify-content: center; align-items: center; margin-bottom: 0.8rem;
    * {
      flex: 1;
    }
     }
    & *:last-child {
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
