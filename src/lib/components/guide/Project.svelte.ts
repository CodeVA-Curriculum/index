import type { Project as DbProject } from '$lib/server/db/schema'
import type { Map } from "./Map.svelte"
import type { Node } from './Node.svelte'
import type { Edge } from './Edge.svelte'
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
      group.addEdges(allEdges, this.db, elementsByPath)
      this.nodeGroups.push(group)
    }
    
  }
  highlight() {
    console.log(this.nodeGroups[0])
    this.highlighted = !this.highlighted
    for(const g of this.nodeGroups) {
      g.highlight()
    }
  }
  toggleComplete() { this.complete = !this.complete }
  markComplete() { this.complete = true }
  draw(p5){

    // this is for debugging purposes only
  }
}

class Group {
  title:string = "$none"
  nodes:Node[] = []
  nodeMask:boolean = []
  edges:Edge[] = []
  edgeMask:boolean[] = []
  constructor(db:any, order:object, elementsByPath:any) {
    this.title = db.alias
    order.sort((a,b) => a.index - b.index)
    for(const c of order) {
      const node = (db.nodes.filter((o) => o.id == c.nodeId))[0]
      this.nodes.push(elementsByPath[node.path])
    }
  }
  addEdges(edges:Edge[], parent:Project, elementsByPath:any) {
    // TODO: Find the edge between each consecutive node in `this.nodes` and add it to `this.edges`
    let ids:number[] = []
    for(const node of this.nodes) {
      ids.push(node.db.id)
    }
    const e = edges.filter((o) => ids.includes(o.to.db.id) && ids.includes(o.from.db.id) && Math.abs(ids.indexOf(o.from.db.id) - ids.indexOf(o.to.db.id)) == 1)
    console.log(`Found ${e.length} edges for group ${this.title} in project ${parent.path}`)
    this.edges = e
  }
  highlight() {
    for(const n of this.nodes) {
      n.highlighted= true
    }
    for(const e of this.edges) {
      e.highlighted = true
    }
  }
}

