import * as types from '$lib/server/db/schema'
import type { Edge } from './Edge.svelte.ts'

export class Project {
  db:types.Project
  edges:Edge[] = $state([])
  nodes:Node[] = $state([])
  constructor(obj:types.Project) {
    this.db = obj
  }
}
