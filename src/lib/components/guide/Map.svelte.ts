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
  centerX:number = 0
  centerY:number = 0
  constructor(map:Input) {
    let maxX = 0; let maxY = 0; let minX = 0; let minY = 0
    for(const node of map.nodes) {
      maxX = node.x > maxX ? node.x : maxX;
      maxY = (node.y) > (maxY) ? node.y : maxY
      minX = (node.x) < (minX) ? node.x : minX;
      minY = (node.y) < (minY) ? node.y : minY
      const obj = new Node(node)
      this.nodes.push(obj)
      this.elementsByPath[node.path] = obj
    }
    this.centerX = (maxX - minX)/2 + minX
    this.centerY = (maxY - minY)/2 + minY
    for(const edge of map.edges) {
      // these are the plain edges. we can de-duplicate them if we want
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
