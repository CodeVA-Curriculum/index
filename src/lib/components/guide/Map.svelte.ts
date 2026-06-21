import { Project } from './Project.svelte'
import { Camera } from './Camera.svelte'
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
  camera:Camera|null = null
  constructor(map:Input) {
    console.log(map)
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
      const obj = new Project(project, this.elementsByPath, map.edges)
      this.projects.push(obj)
      this.elementsByPath[project.path] = obj
    }
  }
  setup(cam:Camera) {
    this.camera = cam
  }
  pushIn(x, y) {
    if(this.camera) {
      const location = camera.getScreenCoords({x: x, y: y + 100}, 0)
      camera.moveCenterTo(location.x, location.y)
      camera.zoom({x:camera.ix, y:camera.iy}, 1, true)
    }
  }
  pushOut() {
    if(this.camera) {
      this.camera.zoom({x:this.camera.ix, y:this.camera.iy}, 0.5, true)
    }
  }
}
