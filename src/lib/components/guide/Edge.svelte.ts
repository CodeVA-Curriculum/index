import type { Edge as DbEdge } from '$lib/server/db/schema'

const STROKE_WEIGHT = 8;
const SELECT_FACTOR = 3

interface ControlPoint {
  x:number,
  y:number
}
export class Edge {
  points:object
  db:DbEdge;
  optional:boolean = false
  optionEdge:any 
  shape:any
  highlight:any
  from:Node;
  to:Node
  x = 0; y = 0;
  stroke = 1;
  cx:number = 0
  cy:number = 0
  highlighted:boolean = $state(false)
  constructor(obj:DbEdge, elementsByPath:any) {
    // console.log("Setting up edge", obj.uid)
    // console.log(obj.toNode.path)
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

    this.cx = this.x + w/2
    this.cy = this.y + h/2

    this.shape = p5.createGraphics(w, h)
    this.shape.fill('rgba(0, 0, 0, 0)')
    this.shape.stroke(this.shape.color(0, 0, 0));
    this.shape.strokeWeight(STROKE_WEIGHT)
    this.shape.bezier(p0.x-this.x, p0.y-this.y ,p1.x-this.x, p1.y-this.y ,p2.x-this.x, p2.y-this.y, p3.x-this.x, p3.y-this.y)

    this.highlight = p5.createGraphics(w,h)
    this.highlight.fill('rgba(0, 0, 0, 0)')
    this.highlight.stroke(255, 0, 0)
    this.highlight.strokeWeight(STROKE_WEIGHT * SELECT_FACTOR)
    this.highlight.bezier(p0.x-this.x, p0.y-this.y ,p1.x-this.x, p1.y-this.y ,p2.x-this.x, p2.y-this.y, p3.x-this.x, p3.y-this.y)

    this.points = { p0: p0, p1:p1, p2:p2, p3:p3}
    this.optionEdge = p5.createGraphics(w,h)
    this.generateOptionEdge(p5)
  }
  draw(p5) {
    p5.image(this.highlighted?  this.highlight : this.shape, this.x, this.y)
    // p5.image(this.highlight, this.x, this.y)
  }
  debug(p5){
    p5.text(this.db.uid, this.cx,  this.cy)
  }
  projectDraw(p5) {
    // p5.text(this.db.uid, this.cx,  this.cy)
    if(this.highlighted) { p5.image(this.optional ? this.optionEdge : this.highlight, this.x, this.y)}
  }
  generateOptionEdge(p5) {
    this.optionEdge.fill('rgba(0, 0, 0, 0)')
    this.optionEdge.stroke(255, 0, 0)
    this.optionEdge.strokeWeight(STROKE_WEIGHT * SELECT_FACTOR)
    // this.optionEdge.bezier(this.points.p0.x - this.x, this.points.p0.y - this.y, this.points.p1.x - this.x, this.points.p1.y - this.y, this.points.p2.x - this.x, this.points.p2.y - this.y, this.points.p3.x - this.x, this.points.p3.y - this.y)
    // this.optionEdge.bezier()
    // this.bezier(p5, this.points.p0.x-this.x, this.points.p0.y-this.y ,this.points.p1.x-this.x, this.points.p1.y-this.y ,this.points.p2.x-this.x, this.points.p2.y-this.y, this.points.p3.x-this.x, this.points.p3.y-this.y, 0.1)
    const t = 0.1
    let o = 0
    for(let i=0;i<1.0001;i+=t) {
        let v = cubic(p5, this.points.p0,this.points.p1,this.points.p2,this.points.p3,i)
        if(o % 2 == 0) {
            // console.log(`Begin ${v.x}, ${v.y}`)
            this.optionEdge.beginShape()
            this.optionEdge.vertex(v.x-this.x,v.y-this.y)
        } else {
    //         console.log("end")
            this.optionEdge.vertex(v.x-this.x,v.y-this.y)
            this.optionEdge.endShape()
            // console.log(`End ${v.x}, ${v.y}`)
        }
        o++
    }
  }
}

export function quadratic(p5:any, p0:Coords, p1:Coords, p2:Coords, t:number):Coords {
    const x1 = p5.lerp(p0.x, p1.x, t)
    const y1 = p5.lerp(p0.y, p1.y, t)
    const x2 = p5.lerp(p1.x, p2.x, t)
    const y2 = p5.lerp(p1.y, p2.y, t)
    const x = p5.lerp(x1, x2, t)
    const y = p5.lerp(y1, y2, t)
    return p5.createVector(x,y)
    // return { x:x, y:y}
}

export function cubic(p5:any, p0:Coords, p1:Coords, p2:Coords, p3:Coords, t:number):Coords {
    const v1 = quadratic(p5, p0,p1,p2,t)
    const v2 = quadratic(p5, p1,p2,p3,t)
    const x = p5.lerp(v1.x, v2.x, t)
    const y = p5.lerp(v1.y, v2.y, t)
    return p5.createVector(x, y)
    // return { x:x, y:y}
}
