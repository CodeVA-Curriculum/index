import * as types from '$lib/server/db/schema'

export class Edge {
  db:types.Edge;
  constructor(obj:types.Edge) {
    this.db = obj
  }
}
