<script lang='ts'>
  import {  getCompleteImage } from '$lib/components/guide/Node.svelte.ts'
  import P5 from './P5.svelte'
  const legend = [{
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
</script>
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
<style lang='scss'>

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
      padding: 0;
      margin: 0;
      gap: 1rem;
      max-width: 9rem;
    }
    background-color: white;
    border-radius: 1rem;
    padding-top: 1rem;
    padding-right: 1rem;
  }
</style>
