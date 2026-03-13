import type { Edge as DbEdge } from '$lib/server/db/schema'

export class Edge {
  db:DbEdge;
  constructor(obj:DbEdge) {
    this.db = obj
  }
  draw(p5) {
    
  }
}
