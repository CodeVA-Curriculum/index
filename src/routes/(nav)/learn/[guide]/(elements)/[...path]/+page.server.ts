import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db/index'
import { eq, and, inArray } from 'drizzle-orm'
let schema = {}
import { project , node } from '$lib/server/db/schema'
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
    results = await db.select().from(project).where(and(
      eq(project.guide, guide.id),
      eq(project.path, searchPath)
    ))
    elType = "project"
  } else {
    // search for a Node
    results = await db.select().from(node).where(and(
      eq(node.guide, guide.id),
      eq(node.path, searchPath)
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
    // for the nodes on this route, just combine all the nodes from the 
    return {
      map: {
        edges: [],
        nodes: [],
        projects: [ element ]
      },
      project: element,
      node: null,
      type: "project"
    }
    // const projectEdges = await db.select().from(nodeToNodeGroup).leftJoin(project, eq(nodeToNodeGroup.projectId, project.id)).leftJoin(node, eq(nodeToNodeGroup.nodeId, node.id)).leftJoin(nodeGroup, eq(nodeToNodeGroup.groupId, nodeGroup.id)).where(eq(project.id, project.id))
    // let nodeGroups = {}
    // let nodes = []
    // let nodeIds = []
    // for(const g of projectEdges) {
    //   if(!nodeGroups[g.node_group.alias]) {
    //     nodeGroups[g.node_group.alias] = []
    //   }
    //   nodeGroups[g.node_group.alias].push(g.node)
    //   nodes.push(g.node)
    //   if(!nodeIds.includes(g.node.id)) {
    //     nodeIds.push(g.node.id)
    //   }
    // }
    // element.nodeGroups = nodes
    // project {
    //   ...element,
    //   nodes: {
    //     $default: [ Node ]
    //   }
    // }

  	return {
  	  element: project,
  	  type: elType
  	};
    // project.edges = edges
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
