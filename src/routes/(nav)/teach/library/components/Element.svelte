<script lang='ts'>
  import { getGradeStyle } from '$lib'
  import Pill from '$lib/components/Pill.svelte'
  import Fa from 'svelte-fa'
  // import type { Element } from '$lib/server/db/schema'
  import FilterAnchorPill from '$lib/components/FilterAnchorPill.svelte';
import Help from '$lib/components/Help.svelte'
    import { dbObjTitles } from '$lib/utils';
    import { faLock, faBookmark, faFolderOpen, faKey } from '@fortawesome/free-solid-svg-icons';

  let { user, obj } = $props()
  let locked = $state(user ? false : true)
  let gradeStyle = getGradeStyle(obj)
</script>
<article class='card'>
  <div class='grade-tab {gradeStyle}'>
    <span>{#if obj.grades.length > 1}GRADES {/if} {obj.gradesAbbr}</span>
  </div>
  <div class='thumbnail {locked ? "locked" : "unlocked"}'>
    <img src="./thumbnails/{obj.db.link}.png" >
    {#if locked}
    <div>
    <span class='icon'><Fa size='4x' icon={faKey} /></span>
    </div>
    {/if}
  </div>
  <div class='body'>
    <h3>{obj.title}</h3>
    <p class='subtitle'>{obj.gradesAbbr} {obj.types[0].title}</p>
    <p>{obj.short}</p>
    {#if obj.children.length > 0}
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
    {/if}
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
</article>

<style lang='scss'>
  @use "$lib/styles/theme.scss";
  // @use "$lib/styles/grades.scss" as g;
  $small: 11pt;
  $medium: 14pt;
  $large: 18pt;
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
      font-size: 18pt;
    }
    p.subtitle {
      margin: 8px 0;
      margin-bottom: 0.75rem;
      font-size: 11pt;
    }
  }
  .thumbnail {
    flex: 1;
    align-items: center;
    position: relative;
    align-items: center;
    position: relative;
    div {
      display: flex;
      width: 100%;
      aspect-ratio: 8.5/11;
      flex-direction: column;
      align-items:center;
      justify-content: center;
      z-index: 99;
      position: absolute;
    }
  }
  // .thumbnail > img { width: 180px; }
  .body {
    flex: 2 0 30%;
    padding-bottom: 0;
    font-size: 14pt;
    details {
      margin-bottom: 2px;
    }
  }
  .stats {
    flex: 2;
    border-left: 1px solid whitesmoke;
    // border-right: 1px solid whitesmoke;
    justify-content: flex-start;
    gap: 0.5rem;
    padding-left: 1rem;
    font-size: 11pt;
    flex-direction: column;
    * {
      margin: 0 0;
      padding: 0 0;
      font-style: italic;
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
    // a {
    //   gap: 12px;
    //   display: flex; flex: 1 1;
    //   width: 100%;
    //   margin: 0rem 0;
    //   justify-content: center;
    //   align-items: center;
    //   margin-bottom: 0.8rem;
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
    @import "$lib/styles/grades";
    @include gradeStyles;
    display: flex;
    flex-direction: column;
    // background-color: pink;
    justify-content: center;
    align-items: center;
    width: 2rem;
    padding: 0 1rem;
    & > span {
      transform: rotate(-90deg);
      font-weight: bolder;
      white-space: nowrap;
      z-index: 0;
      position: relative;
    }
  }
</style>
