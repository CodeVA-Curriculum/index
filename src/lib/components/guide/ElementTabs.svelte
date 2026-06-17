<script lang='ts'>
  import Fa from 'svelte-fa'
  import { faSave } from '@fortawesome/free-solid-svg-icons'
  import Video from '$lib/components/Video.svelte'
  import { Prompt, PracticeQuestion } from '$lib/components/guide/directives'
  let { obj, short } = $props()
  const tabs = [ "Overview", "Quick Take", "Questions", "Prompts" ]
  let active = $state("Overview")

  function select(i:number) {
    active = tabs[i]
  }
  const sectionMap = {
    "Overview": {
      snippet: overview
    },
    "Quick Take": {
      snippet: quicktake
    },
    "Questions": {
      snippet: questions,
      icon: numberpill,
      complete: obj.db.prompts.filter((obj) => obj.status.length > 0 && obj.status[0].complete),
      length: obj.db.questions.length
    },
    "Prompts": {
      snippet: prompts,
      icon: numberpill,
      complete: obj.db.prompts.filter((obj) => obj.status.length > 0 && obj.status[0].complete),
      length: obj.db.prompts.length
    }
  }
</script>

{#snippet overview(obj)}
  <Video />
  {#if !short}
  <p>{obj.db.description ? obj.db.description : obj.db.short }</p>
  {/if}
{/snippet}
{#snippet quicktake(obj)}
  {#if !obj.db.quickTake || obj.db.quickTake.length == 0}
  <p><i>No quick take yet! Read the full tutorial or watch the tutorial video by visiting the <a href="{obj.db.path}">tutorial page linked here.</a></p>
  {:else}
  <QuickTake content={obj.db.quickTake} />
  {/if}
{/snippet}
{#snippet questions(obj)}
  {#if obj.db.questions}
    {#each obj.db.questions as question, i}
      <PracticeQuestion title={question.title} question={question} />
    {/each}
  {:else}
  <p><i>No questions yet! Check back later.</i></p>
  {/if}
{/snippet}
{#snippet prompts(obj)}
  {#if obj.db.prompts}
    {#each obj.db.prompts as prompt}
      <Prompt title={prompt.title} obj={prompt} />
    {/each}
  {:else}
  <p><i>No prompts yet! Check back later.</i></p>
  {/if}
{/snippet}

{#snippet numberpill(a, b)}
  <span class='numberpill'>{a} / {b}</span>
{/snippet}

<div class='element-tabs'>
  <nav>
    <ul>
      {#each tabs as tab, i}
      <li>
        <button onclick={() => select(i)} class='{tab == active ? "select" : "deselect"}'>
          <span>{tab}</span>
          {#if sectionMap[tab].icon}
          {@render numberpill(sectionMap[tab].complete.length, sectionMap[tab].length)}
          {/if}
        </button>
      </li>
      {/each}
    </ul>
  </nav>
  <div class='body'>
    {@render sectionMap[active].snippet(obj)}
  </div>
  {#if !short}
  <div class='footer'>
    <div class='buttons'>
      <a role="button" href="/learn/{obj.db.path}">
        Open Full Tutorial
      </a>
      <button disabled>Save Tutorial</button>
    </div>
  </div>
  {/if}
</div>

<style lang='scss'>
  @import "$lib/styles/theme.scss";
  .footer {
    // height: 4rem;
    position: sticky;
    bottom: 0;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    padding: 0 0.5rem;
    * {
      display: flex;
      flex-direction: row;
      & > * {
        flex: 1 1;
        margin:  16px 8px;
        justify-content: center;
      }
      // &:first-child {
      //   margin-left: 8px;
      // }
    }
  }
  .deselect { background-color: whitesmoke; color: $text; border-color: white; }
  .select { background-color: gray; color: white; border-color: transparent; }
  nav {
    
    display: flex;
    & li {
      flex: 1 0 1;
      padding: 0;
      margin: 0 2px;
    }
    ul { width: 100%; margin: 0; margin-bottom: 1rem;  }
    justify-content: center;
    margin: 0 1rem;
  }
  .body {
    padding: 1rem 1rem;
  }
  p { margin-top: 2rem;}
  .numberpill {
    background-color: lightgray;
    font-weight: bold;
    border-radius: 6px;
    padding: 4px;
    font-size: 10pt;
    margin: 0 2px;
    position: relative;
    top: -2px;
  }
</style>
