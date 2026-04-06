
<script lang='ts'>
    import {onMount} from 'svelte'

    let { children, name, src, alt, tabs } = $props()
    // export let name:string, src:string;
    // export let alt = "The output of the code above";
    // export let tabs:string[] = [];

    let selected = $state(0)
    let tabList = $derived.by(() => JSON.parse(tabs) )
    function changeTab(i:number) {
        console.log("changing tabs...")
        childElems[selected].classList.remove('visible')
        childElems[selected].classList.add('hidden')
        selected = i
        childElems[selected].classList.remove('hidden')
        childElems[selected].classList.add('visible')
    }
    let childElems:HTMLElement[] = $state([])
    onMount(() => {
      for(let i=0;i<tabList.length;i++) {
          let el = document.getElementById(tabList[i]) as HTMLElement
          if(!el) { console.log(`Could not find code tab for ${tabList[i]} in element ${name}`)}
          el.classList.add('hidden')
          childElems = [...childElems, el]
      }
      childElems[0].classList.remove('hidden')
      childElems[0].classList.add('visible')
    })
</script>

<svelte:options customElement='code-and-image' />

<article data-theme="light">
    {#if name}
    <header>
        <p>{name}</p>
    </header>
    {/if}
    <main class='card-content'>
        <div class='code'>
          <nav role="tab-control">
            <ul>
              {#if tabList.length > 1}
              {#each tabList as tab, i}
                <li onclick={() => changeTab(i)} class={selected == i ? 'active' : 'inactive'}><label  for={tab}>{tab.substring(0, tab.indexOf('_'))}</label></li>
              {/each}
              {/if}
            </ul>
          </nav>
          <div role="tabs">
            <slot />
          </div>
        </div>
        {#if src}
        <div class='image'>
            <img {src} {alt}>
        </div>
        {/if}
    </main>
</article>

<style lang='scss'>
  @use "$lib/styles/index.scss";
  article { font-size: 1rem; margin: 2rem 0; }
  header, header *  { padding: 0; margin: 0; }
  main {
    display: flex;
    flex-direction:row;
    gap: 1rem;
    & pre { margin: 0 0; }
  }  
  .code {
    flex: 1 1;
  }
  .image { flex: 1; }
  [role="tab-control"] {
    display: flex;
    flex-direction: row;
    padding-left: 0.5rem;
    ul { width: 100%; }
    label { margin: 0; padding: 0;}
    li {
      font-size: 12pt;
      flex: 1 1;
      padding: 8px 12px; margin: 0;
      border: 1px solid whitesmoke;
      border-bottom: 1px solid grey;
      border-radius: 4px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      &.active {
        border: 1px solid grey;
        border-bottom: 1px solid transparent;
      }
    }
    margin-bottom: 8px;
  }
</style>
