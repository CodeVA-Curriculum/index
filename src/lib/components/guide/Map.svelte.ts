import { Project } from './Project.svelte'
import { Node } from './Node.svelte'
import { Edge } from './Edge.svelte'

interface Input {
  nodes:DbNode[],
  edges:any[],
  projects:DbProject[]
}

export class Map {
  projects:Project[] = []
  nodes:Node[] = []
  edges:Edge[] = []
  elementsByPath:any = {}
  
  constructor(map:Input) {
    for(const node of map.nodes) {
      const obj = new Node(node)
      this.nodes.push(obj)
      this.elementsByPath[node.path] = obj
    }
    for(const edge of map.edges) {
      const obj = new Edge(edge, this.elementsByPath)
      this.edges.push(obj)
    }
    for(const project of map.projects) {
      const obj = new Project(project, this.elementsByPath)
      this.projects.push(obj)
      this.elementsByPath[project.path] = obj
    }
    // const projectEdges = map.projectEdges.toSorted((a,b) => a.node_to_group.index > b.node_to_group.index)
    // for(const edge of projectEdges) {
    //   const parentProject = this.elementsByPath[edge.project.path]
    //   const nodeObj = this.elementsByPath[edge.node.path]
    //   const index = edge.node_to_group.index
    //   const optional = edge.node_to_group.optional
    //   const groupAlias = edge.node_group.alias
    //   parentProject.appendNode(groupAlias, nodeObj, this.edges, optional)
    // }
  }
}
