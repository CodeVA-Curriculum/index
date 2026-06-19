<script lang='ts'>
  import { makeShadow, getCompleteImage } from '$lib/components/guide/Node.svelte.ts'
  import { untrack } from 'svelte'
  import P5 from './P5.svelte'
  import { goto } from '$app/navigation'
  import { page} from '$app/state'
  import type { Node } from './Node.svelte'
  import type { Project } from './Project.svelte'
  import { Cursor } from './Cursor.svelte'
  import { Camera } from './Camera.svelte'

  // let selected = $derived(page.url.searchParams.getAll('select'))
  let debug = $state({})
  let tick = 0
  let start = "twine/applications/start-a-story.md"

  let { view, hoverList = $bindable([]), selected = $bindable([]), elementsByPath, nodes, edges, projects, interact, width=-1, height=-1, map } = $props()
  let oldList = $state([])

  let legend = [{
      label: "Tutorial",
      img: (p5:any) => {
        p5.setup = async () => {
          p5.createCanvas(50,50)
          p5.strokeWeight(4)
          p5.circle(25, 25, 30)
        }
      }
    },
    {
      label: "Connected Tutorials",
      img: (p5:any) => {
        p5.setup = async () => {
          p5.createCanvas(50,50)
          p5.strokeWeight(2)
          p5.fill('rgba(0, 0, 0, 0)')
          p5.bezier(15, 15, 50, 15, 0, 35, 35, 35);
          p5.fill(255)
          p5.circle(15, 15, 15)
          p5.circle(35, 35, 15)
        }
      }
    },
    {
      label: "Completed",
      img: (p5:any) => {
        p5.setup = async () => {
          p5.createCanvas(50,50)
          const i = getCompleteImage(p5, 50, 50)
          p5.image(i, 0, 0)
        }
      }
    },
    {
      label: "Project Path",
      img: (p5:any) => {
        p5.setup = async () => {
          p5.createCanvas(50,50)
          p5.strokeWeight(2)
          p5.stroke(255, 0, 0)
          p5.fill('rgba(0, 0, 0, 0)')
          p5.bezier(15, 15, 50, 15, 0, 35, 35, 35);
          p5.fill(255)
          p5.circle(15, 15, 15)
          p5.circle(35, 35, 15)
        }
      }
    },
    {
      label: "Optional Path",
      img: (p5:any) => {
        p5.setup = async () => {
          p5.createCanvas(50,50)
          p5.stroke(255, 0, 0)
          p5.strokeWeight(8)
          p5.drawingContext.setLineDash([8,15])
          p5.line(0, 25, 50, 25)
        }
      }
    }
  ]

  // hover visualization update
  $effect(() => {
    const old = untrack(() => oldList)
    for(const path of hoverList) {
      if(!old.includes(path)) {
        elementsByPath[path].highlight()
      }
    }
    for(const path of old) {
      if(!hoverList.includes(path)) {
        elementsByPath[path].dehighlight()
      }
    }
    oldList = [...hoverList]
  })

  // Camera movement on param update
  $effect(() => {
    const el = map.elementsByPath[view]
    if(camera && el) {
      const location = camera.getScreenCoords({x: el.x, y: el.y}, 0)
      camera.moveCenterTo(location.x, location.y)
      let z = el.nodeGroups ? 0.25 : 1
      camera.zoom({x:camera.ix, y:camera.iy}, z, true)
    }
  })


  let cursor:Cursor
  let camera:Camera 
  let startImage:any
  let font:any
  export function deselect() {
    console.log("Deselecting...")
    for(const el of selected) {
      el.setSelect(false)
    }
    selected = []
  }
  const sketch = (p5:any) => {
    p5.setup = async () => {
      p5.createCanvas(width < 0 ? p5.displayWidth : width,height < 0? p5.displayHeight*.8 : height)
      camera = new Camera(p5, 1)
      cursor = new Cursor()
      map.setup(camera)
      font = await p5.loadFont('/fonts/calibri-regular.ttf')
      let maxX = 0; let maxY = 0; let minX = 0; let minY = 0
      const completeImage = getCompleteImage(p5, 200, 200)      
      const sw = 200; const sh=250;
      startImage = p5.createGraphics(200, sh)
      startImage.textSize(28)
      startImage.textWrap('WORD')
      startImage.textAlign(p5.CENTER, p5.CENTER)

      // Generate the startImage
      const nodeWidth = 50
      const radius = 125
      const length = 125
      startImage.fill("#232323")
      startImage.stroke(0)
      startImage.strokeWeight(5)
      startImage.triangle(sw/2-radius/2, nodeWidth*1.5, sw/2+radius/2, nodeWidth*1.5, sw/2, nodeWidth*1.5 + length)
      startImage.circle(sw/2, nodeWidth*1.5, radius)
      startImage.strokeWeight(1)
      startImage.fill(255)
      startImage.text("Start Here", sw/4, nodeWidth*1.5, 100)

      for(const node of nodes) {
        await node.setup(p5, font)
        maxX = node.x > maxX ? node.x : maxX;
        maxY = (node.y) > (maxY) ? node.y : maxY
        minX = (node.x) < (minX) ? node.x : minX;
        minY = (node.y) < (minY) ? node.y : minY
        node.completeImage = completeImage
      }
      console.log(`Map boundaries are ${minX}, ${minY}; ${maxX}, ${maxY}`)
      if(!view) {
        
        camera.moveCenterTo(maxX - (maxX - minX)/2, maxY - (maxY - minY)/2)
        camera.zoom({x: camera.ix, y: camera.iy}, 0.25, true)
      } else if(map.elementsByPath[view]){
        const loc = camera.getScreenCoords(map.elementsByPath[view], 0)
        camera.moveCenterTo(loc.x, loc.y)
        let z = map.elementsByPath[view].nodeGroups ? 0.25 : 1
        camera.zoom({x: camera.ix, y: camera.iy}, z, true)
      }

      for(const edge of edges) {
        edge.setup(p5)
      }
      for(const project of projects) {
        project.setup(p5)
      }
      p5.textSize(28)
      p5.textWrap('WORD')
      p5.textAlign(p5.CENTER, p5.CENTER)
      // projects[0].highlight()
    }
    p5.draw = () => {
      tick++
      const el = map.elementsByPath[view]
      if(selected.length == 0 && el){
        selected = [ el ]
        el.setSelect(true)
        // const location = camera.getScreenCoords({x: el.x, y: el.y}, 0)
        // camera.moveCenterTo(location.x - p5.displayWidth * 0.1, location.y)
        // camera.zoom({x:camera.ix, y:camera.iy}, 1, true)
      }
      // debug.cursor = cursor.mx + ', ' + cursor.my
      // debug.local = cursor.localX + ', ' + cursor.localY
      // debug.selected = selected.length
      p5.background("#f5f5f5");
      // p5.text(view, p5.displayWidth/2, p5.displayHeight/2)
      camera.display(() => {
        for(const edge of edges) {
          edge.draw(p5)
        }
        cursor.hovering = []
        for(const project of projects) {
          project.draw(p5)
        }

        let pastStroke = p5.strokeWeight(8)
        for(const node of nodes) {
          const hovering = cursor.over(node)
          node.setHover(hovering)
          node.draw(p5)
          if(start == node.db.path) {
            const floatDist = 24;
            const rate = 0.5
            const offsetY = (Math.floor(tick*rate) % floatDist * 2) - floatDist
            p5.image(startImage, node.x- startImage.width/2, node.y - 18 - startImage.height + (Math.abs(offsetY)))
          }
          if(node.db.path == start && !node.complete) {
            let offsetY = Math.abs((tick/3) % 30 - 15)
            // }
          }
        }
        cursor.update(p5, camera.matrix)
      })
      const offsetCoords = cursor.getDrag(p5)
      if(interact) { 
        camera.offsetTransform(offsetCoords)
      }
    }
    p5.mouseClicked = () => {
      if(!interact) { return }
      console.log(`Camera Location: ${camera.ix}, ${camera.iy}`)
      // console.log("Click!")
      const hoveredNodes = cursor.getHovered()
      if(hoveredNodes.length > 0) {
        const status = hoveredNodes[0].toggleSelect()
        if(status) {
          selected = hoveredNodes
          // zoom in
          // const location = camera.getScreenCoords({x: hoveredNodes[0].x, y: hoveredNodes[0].y + 100}, 0)
          // camera.moveCenterTo(location.x, location.y)
          // camera.zoom({x:camera.ix, y:camera.iy}, 1, true)

          // Write to url
          goto("?view="+selected[0].db.path)
        } else {
          // zoom out & deselect
          selected = []
          camera.zoom({x:camera.ix, y:camera.iy}, 0.5, true)
          // Write to url
          goto("?")
        }
      }
    }
    p5.mouseWheel = (e:any) => {
      if(!interact) { 
        return true // disable map scrolling, but allow the page to scroll 
      }
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
  <div class='legend'>
    <h5>Legend</h5>
    <ul>
      {#each legend as item}
      <li>
        <div class='legend-image'>
          <P5 sketch={item.img} />
        </div>
        <span>{item.label}</span>
      </li>
      {/each}
    </ul>
  </div>
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
  .debug { position: absolute; right: 2rem; display: none; }
  .interactive-map {
    display: flex;
    flex-direction: column;
    // padding-top: 5rem;
    // padding-left: 40%;
    height: 100%;
    // overflow-y: hidden;
    // overflow-x: hidden;
  }
  .legend {
    display: flex;
    flex-direction: column;
    h5 { color: black; text-align: center;}
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 2rem;
    li {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
    }
  }
</style>

