import { Project } from './Project.svelte'
import { Node } from './Node.svelte'
import { Edge } from './Edge.svelte'
export class Map {
  projects:Project[] = []
  nodes:Node[] = []
  edges:Edge[] = []
  elementsByPath:any = {}
  
  constructor(guide:any) {
    for(const node of guide.nodes) {
      const obj = new Node(node)
      this.nodes.push(obj)
      this.elementsByPath[node.path] = obj
    }
    for(const project of guide.projects) {
      const obj = new Project(project, this.elementsByPath)
      this.projects.push(obj)
      this.elementsByPath[project.path] = obj
    }
    const edges = guide.edges.toSorted((a,b) => a.node_to_group.index > b.node_to_group.index)
    for(const edge of guide.edges) {
      const parentProject = this.elementsByPath[edge.project.path]
      const nodeObj = this.elementsByPath[edge.node.path]
      const index = edge.node_to_group.index
      const optional = edge.node_to_group.optional
      const groupAlias = edge.node_group.alias
      parentProject.appendNode(groupAlias, nodeObj, optional)
      this.edges.push(new Edge(edge))
    }
  }
}
