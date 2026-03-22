import type { Project as DbProject } from '$lib/server/db/schema'
import type { Node } from './Node.svelte'
import { NodeInGroup } from './Node.svelte'

export class Project {
  db:DbProject
  title:string = "No title!"
  short:string = "No description provided!"
  difficulty:integer = 0
  complete:boolean = $state(false)
  nodes:Node[] = []
  nodeGroups:any = {}
  groups:number = -1
  constructor(obj:DbProject) {
    this.db = obj
    this.title = obj.title
    this.short = obj.short
    this.difficulty = obj.difficulty
    // this.groups = obj.nodeGroups[0].length

    // For each node group, put references to the Node objects in the order specified by their index attribute
  }
  toggleComplete() { this.complete = !this.complete }
  markComplete() { this.complete = true }
  connectNode(group:string, node:Node, index:number) {
    switch(this.nodeGroups[group]) {
      case undefined:
        this.nodeGroups[group] = {}
      default:
        this.nodeGroups[group][index] = new NodeInGroup(node, false)
    }
  }
  appendNode(group:string, node:Node, optional:boolean) {
    switch(this.nodeGroups[group]) {
      case undefined:
        this.nodeGroups[group] = []
      default:
        this.nodeGroups[group].push(new NodeInGroup(node, optional))
    }
  }
}
