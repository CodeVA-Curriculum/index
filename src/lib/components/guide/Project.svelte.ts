import type { Project as DbProject } from '$lib/server/db/schema'
import type { Map } from "./Map.svelte"
import type { Node } from './Node.svelte'
import type { Edge } from './Edge.svelte'
import { NodeInGroup } from './Node.svelte'
import { EdgeInGroup } from './Edge.svelte'

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
      let group = new Group(g, elementsByPath)
      group.addEdges(allEdges)
      this.nodeGroups.push(group)
    }
    
  }
  highlight() {
    this.highlight = !this.highlight
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
  constructor(db:any, elementsByPath:any) {
    this.title = db.alias
    for(const n of db.nodes) {
      this.nodes.push(elementsByPath[n.path])
    }
  }
  addEdges(edges:Edge[]) {
    // TODO: Find the edge between each consecutive node in `this.nodes` and add it to `this.edges`
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

