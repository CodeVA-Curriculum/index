import * as types from '$lib/server/db/schema'

export class Node {
  db:types.Node
  constructor(obj:types.Node) {
    this.db: = obj
  }
}
