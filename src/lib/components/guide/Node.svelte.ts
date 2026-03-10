import type { Node as DbNode } from '$lib/server/db/schema'

export class Node {
  db:DbNode
  complete:boolean = false
  x = 0; y = 0; radius = 50;
  hover = $state(false)
  scale = 1
  constructor(obj:DbNode) {
    this.db = obj
    this.x = obj.x
    this.y = obj.y
  }
  draw(p5:any) {
    if(this.x && this.y) {
      p5.circle(this.x*this.scale, this.y*this.scale, this.hover ? this.radius * 1.5 : this.radius)
      p5.text(this.db.title, this.x*this.scale, this.y*this.scale)
      // p5.text(this.hover, this.x*this.scale, this.y*this.scale+10)
      p5.text(this.x+", "+this.y, this.x*this.scale, this.y*this.scale+10)
      p5.text(this.hover, this.x*this.scale, this.y*this.scale+20)
    } else {
      console.warn("Tried to render "+this.db.path+" to map, but node is not present in map.canvas!")
    }
  }
}

export class NodeInGroup {
  obj:Node
  optional:boolean = $state(false)
  constructor(node:Node, optional:boolean) {
    this.obj = node
    this.optional = optional
  }
  
}
