import type { Node as DbNode } from '$lib/server/db/schema'
import { Lerp } from '$lib/utils'

export class Node {
  db:DbNode
  complete:boolean = $state(false)
  x = 0; y = 0; radius = 50
  radiusLerp
  hover = false
  scale = 1
  constructor(obj:DbNode) {
    this.db = obj
    this.x = obj.x
    this.y = obj.y
    this.radiusLerp = new Lerp(50, 40)
  }
  draw(p5:any) {
    this.radius = this.hover ? 100 : 50;
    if(this.hover) {
      this.radiusLerp.setTarget(100)
    } else {
      this.radiusLerp.setTarget(50)
    }
    this.radiusLerp.update(p5)
    if(this.x && this.y) {
      p5.circle(this.x*this.scale, this.y*this.scale, this.radiusLerp.get())
      p5.text(this.db.title, this.x*this.scale, this.y*this.scale)
      // p5.text(this.hover, this.x*this.scale, this.y*this.scale+10)
      p5.text(this.radiusLerp.get(), this.x*this.scale, this.y*this.scale+10)
      p5.text(this.x + ", " + this.y, this.x*this.scale, this.y*this.scale+20)
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
