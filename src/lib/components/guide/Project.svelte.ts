import type { Project as DbProject } from '$lib/server/db/schema'

export class Project {
  db:DbProject
  complete:boolean = $state(false)
  constructor(obj:DbProject) {
    this.db = obj
  }
  toggleComplete() { this.complete = !this.complete }
  markComplete() { this.complete = true }
}
