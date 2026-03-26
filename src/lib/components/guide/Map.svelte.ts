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
      this.elementsByPath[obj.db.uid] = obj
    }
    for(const project of map.projects) {
      const obj = new Project(project, this.elementsByPath, this.edges)
      this.projects.push(obj)
      this.elementsByPath[project.path] = obj
    }
  }
}
