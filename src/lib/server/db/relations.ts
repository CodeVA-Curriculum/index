import * as schema from './schema'
import { defineRelations } from 'drizzle-orm';

export const relations = defineRelations(schema, (r) => ({
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
	}
}))
