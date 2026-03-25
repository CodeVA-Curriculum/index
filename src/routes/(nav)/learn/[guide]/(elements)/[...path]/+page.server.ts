import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db/index'
import { eq, and, inArray } from 'drizzle-orm'
let schema = {}
import * as schema from '$lib/server/db/schema'
import { getGuideFromParam } from '$lib/server/db/utils'
// Construct the map and load it in
export const load: LayoutServerLoad = async ({ params, parent, url }) => {
  const { guide } = await parent();
  const searchPath = url.toString().substring(url.toString().indexOf("/learn/")+"/learn/".length)
  // console.log(searchPath)
  let results = []
  let elType:string
  if(params.path.includes("projects")) {
    // search for a project
    results = await db.select().from(schema.project).where(and(
      eq(schema.project.guide, guide.id),
      eq(schema.project.path, searchPath)
    ))
    elType = "project"
  } else {
    // search for a Node
    results = await db.select().from(schema.node).where(and(
      eq(schema.node.guide, guide.id),
      eq(schema.node.path, searchPath)
    ))
    elType = "node"
  }
  if(results.length == 0) {
    return error(404, "File not found!")
  }
  const element:Node|Project = results[0]
  // Do project stuff if needed
  if(elType == "project") {
    const project = await db.query.project.findFirst({
      with: {
        nodeGroups: {
          with: { nodes: true }
        }
      },
      where: {
        id: element.id
      }
    })

    // this needs to return enough stuff to make a map, and a project.
    // for the nodes on this route, just combine all the nodes from the nodeGroups

    // Get edges based on nodes for this route
    let nodes = await db.select().from(schema.nodeToNodeGroup).leftJoin(schema.node, eq(schema.node.id, schema.nodeToNodeGroup.nodeId)).leftJoin(schema.nodeGroup, eq(schema.nodeGroup.id, schema.nodeToNodeGroup.groupId)).where(eq(project.id, schema.nodeToNodeGroup.projectId))
    console.log(`Found ${nodes.length} nodes in project ${project.path}`)
    let edges = []
    for(let i=1;i<project.nodeGroups.length;i ++) {
      const node0 = project.nodeGroups[i-1]
      const node1 = project.nodeGroups[i]
      let newEdge = await db.query.edge.findFirst({
        // with: { toNode: true, fromNode: true},
        where: {
          OR: [{ to: 33, from: 12}, { from: 33, to: 12}]
        }
      })
      if(!newEdge) { throw new Error(`Could not find edge between ${node0.path} and ${node1.path}`)}
      edges.push(newEdge)
      nodes.push(node0)
    }


    return {
      map: {
        edges: [...edges],
        nodes: [...nodes],
        projects: [ project ]
      },
      project: project,
      node: null,
      type: "project"
    }
  }


  // TODO: assemble project objects as needed, not sure about this yet. Gonna work on rendering edges first.
  // TODO: load edges from canvas and compare
  // const edges = await db.select().from(schema.edge).leftJoin(node, or(eq(schema.edge.to, node.id), eq(schema.edge.from, node.id))).where(eq(schema.edge.guide, result.id))
  
  // console.log(nodes)
  // TODO: construct the reactive objects from the database objects
  // Relational query for nodes, edges, and projects based on guide
  // const nodes = await db.select().from(node).where(eq(node.guide == result.id))
  // const edges = await db.select().from(schema.edge).where(eq(schema.edge.guide == result.id))
  // const projects = await db.select().from(project).where(eq(project.guide == result.id))
	return {
	  element: results[0],
	  type: elType
	};
};
