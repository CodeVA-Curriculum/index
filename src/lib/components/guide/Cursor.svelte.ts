import type { Node } from './Node.svelte'

interface Hoverable {
  x:number,
  y:number,
  radius:number
}

export class Cursor {
  hovering:Node[] = []
  x:number = 0
  y:number = 0
  mx = 0
  my = 0
  localX = 0
  localY = 0

  constructor() {
    
  }
  update(p5, matrix:DOMMatrix) {
    this.mx = p5.mouseX
    this.my = p5.mouseY

    const localCoords = getLocalCoords(p5, matrix, { x: this.mx, y: this.my })
    this.localX = localCoords.x
    this.localY = localCoords.y
  }
  getDrag(p5:any) {
    if(p5.mouseIsPressed) {
      return {
        x: p5.pmouseX - p5.mouseX,
        y: p5.pmouseY - p5.mouseY
      } 
    }
    return {
      x: 0,
      y: 0
    }
  }
  over(obj:Node):boolean {
    const a = obj.x -this.mx
    const b = obj.y - this.my
    const c = Math.sqrt(a*a+ b*b)
    return c < obj.radius/2 // node.radius has been misnamed--it should be "diameter" but I don't feel like changing it right now
  }
  getHovered():Node {
    return this.hovering
  }
}
export function getLocalCoords(p5:any, matrix:DOMMatrix, screenCoords:Coords) {
    // from https://www.reddit.com/r/p5js/comments/jo7ucf/clicking_on_a_translated_scaled_and_rotated_shape/
    const localCoord = matrix
        .inverse()
        .transformPoint(
            new DOMPoint(
                screenCoords.x * p5.pixelDensity(),
                screenCoords.y * p5.pixelDensity()
            )
        );
    return localCoord
}
