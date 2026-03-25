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
  nodes:Node[] = []
  edges:Edge[] = []
  nodeGroups:any = {}
  groups:number = -1
  constructor(i:iput) {
    this.db = i
    this.title = i.title
    this.short = i.short
    this.difficulty = i.difficulty
    // this.groups = obj.nodeGroups[0].length

    this.nodeGroups = i.nodeGroups
    // For each node group, put references to the Node objects in the order specified by their index attribute
    // for(const [k,list] of Object.entries(obj.frontmatter.nodes)) {
    //     this.groups.push(new Group(k, (list as unknown as string[]), this, nodeObjs, edges)) // make the group
    // }
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
  appendNode(group:string, node:Node, edges:Edge[], optional:boolean) {
    switch(this.nodeGroups[group]) {
      case undefined:
        this.nodeGroups[group] = []
      default:
        this.nodeGroups[group].push(new NodeInGroup(node, optional))
        if(this.nodeGroups[group].length > 1) {
          let g = this.nodeGroups[group]
          let i = this.nodeGroups[group].length-1
          // pull an edge
          const prevNode = g[i-1]
          const currentNode = g[i]
          const res = this.edges.filter((o) => (o.to.id == prevNode.id) && (o.from.id == currentNode.id) || (o.from.id == prevNode.id && o.to.id == currentNode.id)) 
          this.edges = [...this.edges, ...res]
          // TODO: optional mask
        }
    }
  }

}

class Group {
    name:string
    references:string[] = []
    list:Tutorial[] = []
    listMask:boolean[] = []
    edges:Edge[] = []
    edgeMask:boolean[] = []
    to:string[] = []
    parent:Project

    constructor(name:string, refs:string[], parent:Project, nodeObjs:Tutorial[], edges:Edge[]) {
        this.name = name
        this.references = refs
        this.parent = parent

        // Generate the clean paths and the tutorial mask for the group
        const paths = (refs as unknown as string[]).filter(item => !(item.charAt(0) == '$')) // get all the Tutorials referenced in the group, excluding group references
        for(const item of paths) {
            let cleanPath = this.cleanPath(item)
            const groupObj = (nodeObjs.filter((node) => cleanPath == node.path))[0] as Tutorial
            this.list.push(groupObj)
            if(item.includes('{optional}')) {
                this.listMask.push(true)
            } else {
                this.listMask.push(false)
            }
        }
        if(this.listMask.length != this.list.length) { 
            console.log("listMask",this.listMask)
            console.log("references", this.references)
            console.log("list", this.list)
            throw new Error(`Failed to generate mask for group ${this.name} in project ${this.parent.frontmatter.title}!`) 
        }

        // Handle local edges & generate the mask
        const groupIds = this.getTutorialIds()
        this.edges = edges.filter((e) => {
            // find the indices of the nodes in each group, then filter the edges to find edges that are between two adjacent nodes
            let to = groupIds.indexOf(e.toNode)
            let from = groupIds.indexOf(e.fromNode)
            const nodesAreAdjacent = (to != -1 && from != -1) && (Math.abs(to - from) == 1 || Math.abs(groupIds.indexOf(e.toNode) - groupIds.indexOf(e.fromNode)) == 1)

            let idsWithoutOptional:string[] = []
            for(const id of groupIds) {
                const r = this.getReferenceFromId(id)
                if(r && !r.includes('{optional}')) {
                    idsWithoutOptional.push(id)
                }
            }
             
            const nodesAreAdjacentWithoutOptionalNodes = (to != -1 && from != -1) && (Math.abs(to - from) == 1 || Math.abs(idsWithoutOptional.indexOf(e.toNode) - idsWithoutOptional.indexOf(e.fromNode)) == 1)
            return nodesAreAdjacent || nodesAreAdjacentWithoutOptionalNodes
        })
        for(const edge of this.edges) {
            const to = this.getReferenceFromId(edge.toNode)
            const from = this.getReferenceFromId(edge.fromNode)
            if((to && from) && (to.includes('{optional}') || from.includes('{optional}'))) {
                this.edgeMask.push(true)
            } else {
                this.edgeMask.push(false)
            }
        }
        
    }

    getAllPaths() {
        const paths = this.references.filter(item => !(item.charAt(0) == '$')) // get all the Tutorials referenced in the group, excluding group references
        let cleanPaths:string[] = []
        for(const path of paths) {
            cleanPaths.push(this.cleanPath(path))
        }
        return cleanPaths
    }

    cleanPath(path:string):string {
        return path.replaceAll(' ', '').replace('{optional}','').replace('./', this.parent.path + "/")
    }

    getList():Tutorial[] {
        return this.list
    }

    getTutorialIds():string[] {
        let ids:string[] = []
        for(const element of this.list) {
            ids.push(element.id)
        }
        return ids
    }
    
    getLocalTutorials():Tutorial[] {
        return this.list
    }


    getReferenceFromId(id:string):string|false {
        const node = this.list.find(obj => obj.id == id) as Tutorial
        const ref = this.references.find(ref => this.cleanPath(ref) == node.path)
        return ref ? ref : false
    }
}

