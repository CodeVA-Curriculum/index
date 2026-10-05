<script lang='ts'>
  import { getGradeStyle } from '$lib'
  import Pill from '$lib/components/Pill.svelte'
  import Fa from 'svelte-fa'
  // import type { Element } from '$lib/server/db/schema'
  import FilterAnchorPill from '$lib/components/FilterAnchorPill.svelte';
import Help from '$lib/components/Help.svelte'
    import { dbObjTitles } from '$lib/utils';
    import { faLock, faBoltLightning, faBookmark, faFolderOpen}  from '@fortawesome/free-solid-svg-icons';

  let { user, session, obj } = $props()
  let locked = $state(!obj.path.includes(session?.scope))
  let gradeStyle = getGradeStyle(obj)

  console.log(user)
</script>
<article class='card'>
  <div class='grade-tab {gradeStyle} {locked ? "locked" : "unlocked"}'>
    <span>{#if obj.grades.length > 1}GRADES {:else}GRADE {/if} {obj.gradesAbbr}</span>
  </div>
  <div class='beside-image'>
    <div style='align-self: stretch;'>
  <div class='thumbnail {locked ? "locked" : "unlocked"}'>
    <img class="has-shadow" src="{obj.image}" >
    {#if locked}
    <div>
    <span class='icon'><Fa size='4x' icon={faBoltLightning} /></span>
    </div>
    {/if}
  </div>
  <div class='body {locked ? "locked" : "unlocked"}'>
    <h3>{obj.title}</h3>
    <p class='subtitle'>Grade {obj.gradesAbbr} {obj.types[0].title}</p>
    <p>{obj.short}</p>
  </div>
  </div>
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
      <div>Subjects:</div>
      <div class='tags'>
      {#each obj.subjects as subj}
        {#if subj.abbr != 'CS'}
        <span class='tag light'>{subj.abbr}</span>
        {/if}
      {/each}      
      </div>
    </div>
    <div class='sols'>
      <div>SOLs:</div>
      {#if obj.standards.length > 15}
      {obj.standardsAbbr}
      {:else}
      <div class='tags'>
      {#each obj.standards as s}
        <span class='tag light'>{s.abbr}</span>
      {/each}
      </div>
      {/if}
    </div>
    <div>
      <div>
      Tags:
      </div>
      <div class='tags'>
        {#each obj.tags as tag}
          <span class='tag light'>{tag.title}</span>
        {/each}
      </div>
    </div>
  </div>
</article>

<style lang='scss'>
  @use "$lib/styles/theme.scss";
  $small: 11pt;
  $medium: 14pt;
  $large: 18pt;
  article { margin: 0; padding: 0; &:hover { cursor: auto; } }
  .tags {
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    max-width: 10rem;
    max-height: 4rem;
    flex-direction: row;
    gap: 4px;
  }
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
  .locked, .locked > h3, .locked p {
    color: gray;
    font-style: italic;
  }
  .thumbnail {
    float:left;
    width: 98px;
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
  .thumbnail.locked {
    color: theme.$premium-light;
  }
  .body {
    flex: 2 0 70%;
    padding-left: 1rem;
    padding-bottom: 0;
    font-size: 14pt;
  }
  .stats {
    flex: 0 1;
    border-left: 1px solid whitesmoke;
    justify-content: flex-start;
    gap: 0.5rem;
    padding-left: 1rem;
    font-size: 11pt;
    flex-direction: column;
    * {
      display:flex;
      flex-direction: row;
      justify-content: flex-start;
      padding: 0 4px;
      font-style: italic;
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
    @import "$lib/styles/grades";
    @include gradeStyles;
    display: flex;
    flex-direction: column;
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
  .grade-tab.locked {
    background-color: theme.$premium;
    color: white;
  }
  .beside-image {
    display: flex;
    flex-direction:column;
    width: 100%;
    flex: 4;
  }
  details {
    flex: 0 1;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
</style>
