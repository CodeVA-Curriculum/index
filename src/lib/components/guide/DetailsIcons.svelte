<script lang='ts' module>
  export const ElementType = {
    Project:0,
    Tutorial:1
  }
  type Type = typeof ElementType[keyof typeof ElementType];
</script>
<script lang='ts'>
  import Fa from 'svelte-fa'
  import { faLocationDot, faFire, faRoute } from '@fortawesome/free-solid-svg-icons'
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
    <span># Qs</span>
  </div>
  <div>
    <span># Prompts</span>
  </div>
  <div>
    <span><Fa icon={faRoute} /></span>
    <span>0</span>
  </div>
  {/if}
</div>

<style lang='scss'>
  .details-icons {
    display: flex;
    flex-direction: row;
    margin: 1rem 0;
    & > * {
      padding: 8px 8px;
      margin: 0;
      display: flex;
      flex: 1 1;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      & > span {
        position: relative;
        top: 1px;
        margin: 0 6px;
      }
    }
  }
  .mark {
    min-width: fit-content;
    max-width: fit-content;
    padding: 12px 12px;
    font-size: 11pt;
    border-radius: 4px;
    font-size: 10pt;
    background-color: whitesmoke;
  }
</style>
