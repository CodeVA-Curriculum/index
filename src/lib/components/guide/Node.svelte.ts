import type { Node as DbNode } from '$lib/server/db/schema'

export class Node {
  db:DbNode
  complete:boolean = false
  constructor(obj:DbNode) {
    this.db = obj
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
