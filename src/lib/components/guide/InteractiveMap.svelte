<script lang='ts'>
  import P5 from './P5.svelte'
  import { goto } from '$app/navigation'
  import { page} from '$app/state'
  import type { Node } from './Node.svelte'
  import type { Project } from './Project.svelte'
  import { Cursor } from './Cursor.svelte'
  import { Camera } from './Camera.svelte'

  let selected = $derived(page.url.searchParams.getAll('select'))
  let debug = $state({})

  // function route() {
  //   const url = new URL(page.url)
  //   url.searchParams.set('select', 'hey')
  //   goto(url.toString(), { replaceState: false })
  // }
  let { nodes, edges } = $props()
  // let nodes = []
  let selectedProjects:Project[] = $state([])
  let selectedNodes:Node[] = $state([])
  let cursor:Cursor|null = null
  let camera:Camera|null = null
  let font:any
  const sketch = (p5:any) => {
    p5.setup = async () => {
      p5.createCanvas(p5.displayWidth,p5.displayHeight*.8)
      camera = new Camera(p5, 1)
      cursor = new Cursor()
      font = await p5.loadFont('/fonts/calibri-regular.ttf')
      for(const node of nodes) {
        node.setup(p5, font)
      }
      for(const edge of edges) {
        edge.setup(p5)
      }
    }
    p5.draw = () => {
      debug.cursor = cursor.mx + ', ' + cursor.my
      debug.local = cursor.localX + ', ' + cursor.localY
      p5.background(180);
      for(const project of selectedProjects) {
        project.highlight()
      }
      camera.display(() => {
        for(const edge of edges) {
          edge.draw(p5)
        }
        for(const node of nodes) {
          const hovering = cursor.over(node)
          node.hover = hovering
          node.draw(p5)
        }
        cursor.update(p5, camera.matrix)
      })
      const offsetCoords = cursor.getDrag(p5)
      let lerpComplete = camera.offsetTransform(offsetCoords)
    }
    p5.onMouseClicked = () => {
      const hoveredNodes = cursor.getHovered()
      if(hoveredNodes.length > 0) {
        hoveredNodes[0].select()
        selectedNodes.push(hoveredNodes[0])
      }
    }
    p5.mouseWheel = (e:any) => {
      let scaleFactor = null;
      const zoomSensitivity = 0.1
      if (e.delta < 0) {
          scaleFactor = 1 + zoomSensitivity; // Zoom in
      } else {
          scaleFactor = 1 - zoomSensitivity; // Zoom out
      }
      camera.zoom({ x: cursor.mx, y: cursor.my}, scaleFactor, false)
      return false // disable scroll on page
    }
  }

</script>

<div class='interactive-map'>
  <P5 sketch={sketch} />
  <div class='debug'>
    {#each Object.entries(debug) as entry}
    <p>{entry}{debug[entry]}</p>
    {/each}
    <p>Mock Links:</p>
    <ul>
      <li><a href="twine">Clear</a></li>
      <li><a href="twine?select=hey">Hey</a></li>
    </ul>
  </div>
</div>
<style lang='scss'>
  .debug { position: absolute; }
  .interactive-map {
    display: flex;
    flex-direction: column;
    // padding-top: 5rem;
    // padding-left: 40%;
    height: 100%;
    // overflow-y: hidden;
    // overflow-x: hidden;
  }
</style>

