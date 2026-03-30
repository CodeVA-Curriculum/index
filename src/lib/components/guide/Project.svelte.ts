import type { Project as DbProject } from '$lib/server/db/schema'
import type { Map } from "./Map.svelte"
import type { Node } from './Node.svelte'
import { Edge } from './Edge.svelte'
import { NodeInGroup } from './Node.svelte'

interface Input {
  nodeGroups:object,
  nodes:Node[], // global Map level so we can get responsive objects
  edges:any[]   // same. I guess to render a project we need a Map first
}

export class Project {
  db:DbProject
  title:string = "No title!"
  short:string = "No description provided!"
  difficulty:integer = 0
  complete:boolean = $state(false)
  edges:Edge[] = [] 
  nodeGroups:Group = []
  highlighted = $state(false)
  groups:number = -1
  // need live nodes and edges before building reactive Project
  constructor(i:Input, elementsByPath:any, allEdges:Edge[]) {
    this.db = i
    this.title = i.title
    this.short = i.short
    this.difficulty = i.difficulty


    // build node groups and edges
    for(const g of i.nodeGroups) {
      let group = new Group(g, i.pivot, elementsByPath)
      group.addEdges(allEdges, i.pivot, elementsByPath)
      this.nodeGroups.push(group)
    }
    
  }
  highlight() {
    this.highlighted = true
    for(const g of this.nodeGroups) {
      g.highlight()
    }
  }
  dehighlight() {
    this.highlighted = false
    for(const g of this.nodeGroups) {
      g.dehighlight()
    }
  }
  toggleComplete() { this.complete = !this.complete }
  markComplete() { this.complete = true }
  setup(p5) {
    for(const g of this.nodeGroups) {
      g.setup(p5)
    }
  }
  draw(p5){
    for(const g of this.nodeGroups) {
      g.draw(p5)
    }
  }
}

class Group {
  title:string = "$none"
  nodes:Node[] = []
  nodeMask:boolean = []
  edges:Edge[] = []
  constructor(db:any, order:object, elementsByPath:any) {
    this.title = db.alias
    order.sort((a,b) => a.index - b.index)
    for(const c of order) {
      const node = (db.nodes.filter((o) => o.id == c.nodeId))[0]
      this.nodes.push(elementsByPath[node.path])
      this.nodeMask.push(c.optional)
    }
  }
  setup(p5) {
    for(const e of this.edges) {
      e.setup(p5)
    }
    console.log("Group has edges", this.edges.length)
  }
  draw(p5) {
    for(const e of this.edges) {
      e.projectDraw(p5)
    }
  }
  addEdges(edges:Edge[], order:object, elementsByPath:any) {
    // TODO: Find the edge between each consecutive node in `this.nodes` and add it to `this.edges`
    let ids:number[] = []
    for(const node of this.nodes) {
      ids.push(node.db.id)
    }
    const e = edges.filter((o) => ids.includes(o.toNode.id) && ids.includes(o.fromNode.id) && Math.abs(ids.indexOf(o.fromNode.id) - ids.indexOf(o.toNode.id)) == 1)
    // console.log(`Found ${e.length} edges for group ${this.title} in project ${parent.path}`)
    for(const dbEdge of e) {
      const o = new Edge(dbEdge, elementsByPath)

      const node0optional = this.nodeMask[this.nodes.findIndex((n) => n.db.id == o.to.db.id)]
      const node1optional = this.nodeMask[this.nodes.findIndex((n) => n.db.id == o.from.db.id)]
      o.optional = node0optional || node1optional
      this.edges.push(o)
    }
    // add edges between non-optional nodes
    let pairs = []
    let lastFalse:number = 0
    let inCut:boolean = false
    console.log(this.nodeMask)
    for(let i=0;i<this.nodeMask.length;i++) {
      inCut = this.nodeMask[i]
      if(!inCut && i-lastFalse > 1) {
        // console.log(`Need edge between ${i} and ${lastFalse}`)
        const e = edges.filter((o) => (o.toNode.id == this.nodes[i].db.id && o.fromNode.id == this.nodes[lastFalse].db.id) || (o.fromNode.id == this.nodes[lastFalse].db.id && o.toNode.id == this.nodes[i].db.id))[0]
        // console.log(`Found ${e.length} edges to base new Edge off of`)
        const o = new Edge(e, elementsByPath)
        o.optional = false
        this.edges.push(o)
      }
      if(!inCut) { lastFalse = i}
    }
  }
  highlight() {
    for(const n of this.nodes) {
      n.highlighted= true
    }
    for(const e of this.edges) {
      e.highlighted = true
    }
  }
  dehighlight() {
    for(const n of this.nodes) {
      n.highlighted = false
    }
    for(const e of this.edges) {
      e.highlighted = false
    }
  }
}

