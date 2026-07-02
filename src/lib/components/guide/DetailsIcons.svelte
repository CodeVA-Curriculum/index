<script lang='ts' module>

  export const ElementType = {
    Project:0,
    Tutorial:1
  }
</script>
<script lang='ts'>
  import { enhance } from '$app/forms';
  import Fa from 'svelte-fa'
  import { faLocationDot, faClipboardQuestion, faTerminal, faFire, faRoute } from '@fortawesome/free-solid-svg-icons'
  let { eltype = 0, obj } = $props()
  let form;
  const ElementType = {
    Project:0,
    Tutorial:1
  }
  let iconSnippet
  let iconParams = []
  if(eltype == 1) {
    let completePrompts = obj.db.prompts.filter((obj) => obj.status?.length > 0 && obj.status[0].complete)
    let completeQuestions = obj.db.questions.filter((obj) => obj.status?.length > 0 && obj.status[0].complete)
    iconSnippet = elementIcons
    iconParams = [completeQuestions.length, obj.db.questions.length, completePrompts.length, obj.db.prompts.length]
  } else {
    iconSnippet = projectIcons
    iconParams = [obj.size, obj.db.difficulty, obj.getCompletePercent()]
  }
  async function update() {
		await fetch('/learn', {
			method: 'POST',
			body: JSON.stringify({
			  type: eltype == 0 ? "project" : "node",
			  itemId: obj.db.id,
			  complete: obj.complete
			})
		});
  }
</script>
{#snippet elementIcons(a, b, c, d)}
  <div>
    <span><Fa icon={faClipboardQuestion} /></span>
    <span>{a}/{b}</span>
  </div>
  <div>
    <span><Fa icon={faTerminal} /></span>
    <span>{c}/{d}</span>
  </div>
{/snippet}
{#snippet projectIcons(a, b, c)}
  <div>
    <Fa icon={faLocationDot} />
    <span>{a}</span>
  </div>
  <div>
    <Fa icon={faFire} />
    <span>{b}</span>
  </div>
  <div>
    <span>{c}%</span>
  </div>
{/snippet}
<div class='details-icons'>
    <div class='mark'>
      <input onchange={update} type="checkbox" bind:checked={obj.complete}>
      Mark Complete
    </div>
    {@render iconSnippet(iconParams[0], iconParams[1], iconParams[2], iconParams.length == 4 ? iconParams[3] : null)}
</div>

<style lang='scss'>
  .details-icons {
    margin: 0.5rem 0;
    display: flex;
    flex-direction: row;
    & > * {
      margin: 0 0.5rem;
      display: flex;
      flex: 0 1;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      min-width: fit-content;
      & > span {
        position: relative;
        top: 1px;
        margin: 0 6px;
      }
    }
  }
  .mark {
    margin: 0;
    margin-right: 1rem;
    min-width: fit-content;
    max-width: fit-content;
    padding: 8px 12px;
    font-size: 11pt;
    border-radius: 4px;
    font-size: 10pt;
    background-color: whitesmoke;
  }
</style>
