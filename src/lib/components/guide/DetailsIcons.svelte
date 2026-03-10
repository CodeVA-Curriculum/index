<script lang='ts' module>
  export const ElementType = {
    Project:0,
    Tutorial:1
  }
</script>
<script lang='ts'>
  import Fa from 'svelte-fa'
  import { faLocationDot, faClipboardQuestion, faTerminal, faFire, faRoute } from '@fortawesome/free-solid-svg-icons'
  let { eltype = 0} = $props()
  
  const ElementType = {
    Project:0,
    Tutorial:1
  }
  type Type = typeof ElementType[keyof typeof ElementType];
</script>
<div class='details-icons'>
  <div class='mark'>
    <input type="checkbox">
      Mark Complete
  </div>
  {#if eltype == ElementType.Project}
  <div>
    <Fa icon={faLocationDot} />
    <span>0</span>
  </div>
  <div>
    <Fa icon={faFire} />
    <span>0</span>
  </div>
  <div>
    <span>0%</span>
  </div>
  {:else if eltype==ElementType.Tutorial}
  <div>
    <span><Fa icon={faClipboardQuestion} /></span>
    <span>0/0</span>
  </div>
  <div>
    <span><Fa icon={faTerminal} /></span>
    <span>0/0</span>
  </div>
  <div>
    <span><Fa icon={faRoute} /></span>
    <span>0</span>
  </div>
  {/if}
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
