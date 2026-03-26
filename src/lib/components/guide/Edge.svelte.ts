import type { Edge as DbEdge } from '$lib/server/db/schema'

interface ControlPoint {
  x:number,
  y:number
}
export class Edge {
  db:DbEdge;
  optional:boolean = false
  optionEdge:any 
  shape:any
  highlight:any
  from:Node;
  to:Node
  x = 0; y = 0;
  stroke = 1;
  c1:ControlPoint
  c2:ControlPoint
  highlighted:boolean = $state(false)
  constructor(obj:DbEdge, elementsByPath:any) {
    this.db = obj
    this.from = elementsByPath[obj.fromNode.path]
    this.to = elementsByPath[obj.toNode.path]
  }
  setup(p5) {
    const w = Math.abs(this.from.x - this.to.x) + this.stroke + 600
    const h = Math.abs(this.from.y - this.to.y) + this.stroke + 600
    this.x = (this.from.x < this.to.x ? this.from.x : this.to.x) - 300
    this.y = (this.from.y < this.to.y ? this.from.y : this.to.y) - 300
    // TODO: procedurally calculate the position of the control points
    const controlPointKeyX = {"left":-300,"right":300,"top":0,"bottom":0}
    const controlPointKeyY = {"left":0,"right":0,"top":-300,"bottom":300}
    this.c1 = { x: this.to.x + controlPointKeyX[this.db.toSide], y: this.to.y + controlPointKeyY[this.db.toSide]}
    this.c2 = { x: this.from.x + controlPointKeyX[this.db.fromSide], y: this.from.y + controlPointKeyY[this.db.fromSide]}
    const p0 = p5.createVector(this.to.x, this.to.y)
    const p1 = p5.createVector(this.c1.x, this.c1.y)
    const p2 = p5.createVector(this.c2.x, this.c2.y)
    const p3 = p5.createVector(this.from.x, this.from.y)

    this.shape = p5.createGraphics(w, h)
    this.shape.fill('rgba(0, 0, 0, 0)')
    this.shape.stroke(this.shape.color(0, 0, 0));
    this.shape.strokeWeight(1)
    this.shape.bezier(p0.x-this.x, p0.y-this.y ,p1.x-this.x, p1.y-this.y ,p2.x-this.x, p2.y-this.y, p3.x-this.x, p3.y-this.y)

    this.highlight = p5.createGraphics(w,h)
    this.highlight.fill('rgba(0, 0, 0, 0)')
    this.highlight.stroke(255, 0, 0)
    this.highlight.strokeWeight(12)
    this.highlight.bezier(p0.x-this.x, p0.y-this.y ,p1.x-this.x, p1.y-this.y ,p2.x-this.x, p2.y-this.y, p3.x-this.x, p3.y-this.y)

    this.optionEdge = p5.createGraphics(w,h)
    this.optionEdge.fill('rgba(0, 0, 0, 0)')
    this.optionEdge.stroke(255, 0, 0)
    this.optionEdge.strokeWeight(12)
    this.optionEdge.bezier(p0.x-this.x, p0.y-this.y ,p1.x-this.x, p1.y-this.y ,p2.x-this.x, p2.y-this.y, p3.x-this.x, p3.y-this.y)
  }
  draw(p5) {
    p5.image(this.highlighted?  this.highlight : this.shape, this.x, this.y)
    // p5.image(this.highlight, this.x, this.y)
  }
  projectDraw(p5) {
    if(this.highlighted) { p5.image(this.optional ? this.optionEdge : this.highlight, this.x, this.y)}
  }
}

