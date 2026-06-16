import * as schema from './schema'
import { defineRelations } from 'drizzle-orm';

export const relations = defineRelations(schema, (r) => ({
	user: {},
	question: {
		status: r.many.user_to_question({
			from: r.question.id,
			to: r.user_to_question.itemId
		}),
	},
	prompt: {
		status: r.many.userToPrompt({
			from: r.prompt.id,
			to: r.userToPrompt.itemId
		}),
	},
	collection: {
		element: r.one.element({
			from: r.collection.elementId,
			to: r.element.id
		})
	},
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
	standard: {
		grade: r.one.grade({
			from: r.standard.gradeId,
			to: r.grade.id
		}),
		subject: r.one.subject({
			from: r.standard.subjectId,
			to: r.subject.id
		})
	},
	// activity: {
	// 	standards: r.many.standard({
	// 		from: r.activity.id.through(r.activityToStandard.activityId),
	// 		to: r.standard.id.through(r.activityToStandard.standardId)
	// 	})
	// },
	element: {
		collection: r.one.collection({
			from: r.element.id,
			to: r.collection.elementId
		}),
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
		}),
		children: r.many.element({
			from: r.element.id.through(r.child_element_ref.parent_id),
			to: r.element.id.through(r.child_element_ref.child_id)
		})
	},
	project: {
		status: r.many.pivotUserProject({
			from: r.project.id,
			to: r.pivotUserProject.itemId
		}),
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
		status: r.many.user_to_node({
			from: r.node.id,
			to: r.user_to_node.itemId
		}),
		prompts: r.many.prompt({
			from: r.node.id,
			to: r.prompt.node
		}),
		questions: r.many.question({
			from: r.node.id,
			to: r.question.node
		}),
		projects: r.many.project({
			from: r.node.id.through(r.nodeToNodeGroup.nodeId),
			to: r.project.id.through(r.nodeToNodeGroup.projectId)
		})
	}
}))
