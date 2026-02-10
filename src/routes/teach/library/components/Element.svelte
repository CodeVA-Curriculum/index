<script lang='ts'>
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
    <p>{obj.short}</p>
    <span>items: TODO</span>
  </div>
  <div class='stats'>
      <span>Type: {obj.types[0].title}</span>
      <span>Audiences: {dbObjTitles(obj.audiences)}</span>
      <span>Subjects: {dbObjTitles(obj.subjects)}</span>
      {#if obj.standards.length > 0}<span>SOLs: {#each obj.standards as o}o.title{/each}</span>{/if}
  </div>
  <div class='buttons'>
    <a role='button' href="TODO:">Open <Fa icon={faFolderOpen} /></a>
    <button>Save <Fa icon={faBookmark} /></button>
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
