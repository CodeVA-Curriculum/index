import * as schema from './schema'
import { defineRelations } from 'drizzle-orm';

export const relations = defineRelations(schema, (r) => ({
	edge: {
		toNode: r.one.node({
			from: r.edge.to,
			to: r.node.id
		}),
		fromNode: r.one.node({
			from: r.edge.from,
			to: r.node.id
		})
	},
	element: {
		subjects: r.many.subject({
			from: r.element.id.through(r.elementToSubj.elementId),
			to: r.subject.id.through(r.elementToSubj.subjectId)
		}),
		standards: r.many.standard({
			from: r.element.id.through(r.elementToStandard.elementId),
		to: r.standard.id.through(r.elementToStandard.standardId)
		}),
		grades: r.many.grade({
			from: r.element.id.through(r.elementToGrade.elementId),
			to: r.grade.id.through(r.elementToGrade.gradeId)
		}),
		types: r.many.elementType({
			from: r.element.id.through(r.elementToType.elementId),
			to: r.elementType.id.through(r.elementToType.typeId)
		}),
		audiences: r.many.audience({
			from: r.element.id.through(r.elementToAudience.elementId),
			to: r.audience.id.through(r.elementToAudience.audienceId)
		}),
		tags: r.many.tag({
			from: r.element.id.through(r.elementToTag.elementId),
			to: r.tag.id.through(r.elementToTag.tagId)
		})
	},
	project: {
		nodeGroups: r.many.nodeGroup({
			from: r.project.id,
			to: r.nodeGroup.projectId
		}),
		pivot: r.many.nodeToNodeGroup({
			from: r.project.id,
			to: r.nodeToNodeGroup.projectId
		}),
		// order: r.many.nodeToNodeGroup({
		// 	from: r.project.id,
		// 	to: r.nodeToNodeGroup.projectId
		// }),
		guideObj: r.one.guide({
			from: r.project.guide,
			to: r.guide.id
		})
	},
	nodeGroup: {
		nodes: r.many.node({
			from: r.nodeGroup.id.through(r.nodeToNodeGroup.groupId),
			to: r.node.id.through(r.nodeToNodeGroup.nodeId)
		}),
		
		project: r.one.project({
			from: r.nodeGroup.projectId,
			to: r.project.id
		})
	},
	node: {
		projects: r.many.project({
			from: r.node.id.through(r.nodeToNodeGroup.nodeId),
			to: r.project.id.through(r.nodeToNodeGroup.projectId)
		})
	}
	// project: {
	// 	groups: r.many.nodeGroup({
	// 		from: r.project.id,
	// 		to: r.nodeGroup.projectId
	// 	}),
		// allNodes: r.many.node({
		// 	from: r.project.id.through(r.nodeToNodeGroup.projectId),
		// 	to: r.node.id.through(r.nodeToNodeGroup.nodeId)
		// }),
		// guide: r.one.guide({
		// 	from: r.project.guideId,
		// 	to: r.guide.id
		// })
	// }
}))
