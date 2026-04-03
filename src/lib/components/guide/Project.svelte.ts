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
  groupsPathMap = {}
  title:string = "No title!"
  x:number; y:number
  short:string = "No description provided!"
  difficulty:integer = 0
  complete:boolean = $state(false)
  edges:Edge[] = [] 
  nodeGroups:Group = []
  highlighted = $state(false)
  groups:number = -1
  groupPos = $state(0)
  nodePos = $state(0)
  selected = $state(false)
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
      const paths = group.getPaths()
      this.nodeGroups.push(group)
      for(const path of paths) {
        this.groupsPathMap[path] = this.nodeGroups.length-1
      }
    }
    // Find center
    let { x, y } = this.findCenter()
    this.x = x; this.y = y
    console.log(`Found center for ${this.db.path} at ${x}, ${y}`)
    
  }
  private findCenter() {
    let minX = 0; let minY = 0; let maxX = 0; let maxY = 0;
    for(const g of this.nodeGroups) {
      for(const node of g.nodes) {
        minX = node.x < minX ? node.x : minX
        minY = node.y < minY ? node.y : minY
        maxX = node.x > maxX ? node.x : maxX
        maxY = node.y > maxY ? node.y : maxY
      }
    }
    return {
      x: minX + (maxX - minX)/2,
      y: minY + (maxY - minY)/2
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
    if(this.highlighted) {
      p5.circle(this.centerX, this.centerY, 40)
    }
  }
  getNext(path = "default") {
    if(path == "default") { return [ ...this.nodeGroups[0].getNext(path) ] }
    return this.getGroupByPath(path).getNext(path)
  }
  getGroupByPath(path:string) {
    return this.nodeGroups[this.groupsPathMap[path]]
  }
  getGroupNodeCount() {
    let groupsCount = this.nodeGroups.length
    let nodesCount = 0
    for(const g of this.nodeGroups) {
      nodesCount += g.nodes.length
    }
    return {
      groups: groupsCount,
      nodes: nodesCount
    }
  }
  toggleSelected() {
    this.selected = !this.selected
  }
  setSelect(status:boolean) {
    this.selected = status
    if(status) { this.highlight() } else { this.dehighlight() }
  }
}

class Group {
  title:string = "$none"
  nodes:Node[] = []
  nodeMask:boolean = []
  edges:Edge[] = []
  x = 0; y = 0
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
  getPaths() {
    let paths = []
    for(const n of this.nodes) {
      paths.push(n.db.path)
    }
    return paths
  }
  getNext(path = "default") {
    let s = []
    if(path == "default") { return [ {
      path: this.nodes[0].db.path,
      title: this.nodes[0].db.title,
      optional: this.nodeMask[0]
    } ] }
    let pos = this.nodes.findIndex((n) => n.db.path == path)
    for(let i=pos+1;i<this.nodes.length;i++) {
      s.push({
        path: this.nodes[i].db.path,
        title: this.nodes[i].db.title,
        optional: this.nodeMask[i]
      })
      if(!this.nodeMask[i]) {
        break
      }
    }
    return s
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

