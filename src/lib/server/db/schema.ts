import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'
import { defineRelations } from 'drizzle-orm'
import { primaryKey, integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';



// userland
export const user = sqliteTable('user', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	email: text('email'),
	username: text('username'),
	passwordHash: text('password_hash')
});

// TODO: refactor: apply these columns to any element that can be saved to the user's profile
// export const userSaveable = {
// 	savedAt: integer({ mode: 'timestamp' }).defaultNow(),
// 	userId: integer('user_id').references(() => user.id)
// }

export const session = sqliteTable('session', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id').references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' })
});


export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;

// Library Elements
export const element = sqliteTable('element', {
	// table schema contain exclusively read-only properties. Relational fields are expressed in other areas of this file.
	id: integer('id').primaryKey({ autoIncrement: true }),
	path: text('path'),
	title: text('title'),
	short: text('short').default("Short description"),
	long: text('long').default("Long description"),
	authors: text().default("CodeVA Curriculum"),
	content: text(),
	link: text(),
	hidden: integer({ mode: 'boolean' }),
	gradesAbbr: text(),
	standardsAbbr: text()
})
export type Element = typeof element.$inferSelect;

// // Subjects & Courses
export const subject = sqliteTable('subject', {
	id: integer('id').primaryKey(),
	title: text(),
	abbr: text(),
	subjectId: integer('subject_id').references(() => subject.id),
	strands: text({ mode: 'json' })
})
export type Subject = typeof subject.$inferSelect;
export const course = sqliteTable('course', {
	id: integer('id').primaryKey(),
	title: text(),
	subjectId: integer('subject_id').references(() => subject.id),
	abbr: text(),
	strands: text({ mode: 'json' })
})
export type Course = typeof course.$inferSelect;

// Static content: grade levels, audiences, element types
export const grade = sqliteTable('grade', {
	id: integer('id').primaryKey(),
	title: text(),
	abbr: text()
})
export type Grade = typeof grade.$inferSelect

export const tag = sqliteTable('tag', {
	id: integer('id').primaryKey(),
	title: text()
})

export const audience = sqliteTable('audience', {
	id: integer('id').primaryKey(),
	title: text()
})
export type Audience = typeof audience.$inferSelect

export const elementType = sqliteTable('element_type', {
	id: integer('id').primaryKey(),
	title: text()
})
export type ElementType = typeof elementType.$inferSelect

// static content pivot tables
export const elementToGrade = sqliteTable('element_to_grade', {
		elementId: integer('element_id').references(() => element.id),
		gradeId: integer('grade_id').references(() => grade.id)
	},
	(t) => [primaryKey({ columns: [t.elementId, t.gradeId] })]
)
export const elementToAudience= sqliteTable('element_to_audience', {
		elementId: integer('element_id').references(() => element.id),
		audienceId: integer('audience_id').references(() => audience.id)
	},
	(t) => [primaryKey({ columns: [t.elementId, t.audienceId] })]
)
export const elementToType = sqliteTable('element_to_type', {
		elementId: integer('element_id').references(() => element.id),
		typeId: integer('type_id').references(() => elementType.id)
	},
	(t) => [primaryKey({ columns: [t.elementId, t.typeId] })]
)
export const elementToTag = sqliteTable('element_to_tag', {
		elementId: integer('element_id').references(() => element.id),
		tagId: integer('tag_id').references(() => tag.id)
	},
	(t) => [primaryKey({ columns: [t.elementId, t.tagId] })]
)
export const elementToSubj = sqliteTable('element_to_subj', {
		elementId: integer('element_id').references(() => element.id),
		subjectId: integer('subject_id').references(() => subject.id)
	},
	(t) => [primaryKey({ columns: [t.elementId, t.subjectId] })]
)
export const standard = sqliteTable('standard', {
	id: integer('id').primaryKey(),
	abbr: text(),
	title: text(),
	gradeId: integer('grade_id').references(() => grade.id),
	subjectId: integer('subject_id').references(() => subject.id),
	text: text() // HTML
})
export type Standard = typeof standard.$inferSelect

export const elementToStandard = sqliteTable('element_to_standard', {
	elementId: integer('element_id').references(() => element.id),
	standardId: integer('standard_id').references(() => standard.id)
},
	(t) => [primaryKey({ columns: [t.elementId, t.standardId]})]
)


// Trail Guide Stuff


// export const projectRelations = relations({ project, user, node }, (r) => ({
// 	project: {
// 		nodes: r.many.node({
// 			from: r.project.id.through(r.pivotNodeProject.projectId),
// 			to: r.node.id.through(r.pivotNodeProject.nodeId)
// 		})
// 	},
// 	user: {
// 		savedProjects: r.many.project({
// 			from: r.project.id.through(r.pivotUserProject.project.id),
// 			to: r.user.id.through(r.pivotUserProject.user.id)
// 		})
// 	},
// 	node: {
// 		projects: r.many.project()
// 	}
// }))

export const pivotUserElement = sqliteTable('pivot_user_element', {
	userId: integer('user_id').references(() => user.id),
	elementId: integer('element_id').references(() => element.id)
},
	(t) => [primaryKey({ columns: [t.userId, t.elementId]})]
)


export const guide = sqliteTable('guide', {
	id: integer('id').primaryKey(),
	title: text('title'),
	path: text('path'),
	short: text('short'),
	description: text('description'),
	image: text('image')
})
export type Guide = typeof guide.$inferSelect;

export const node = sqliteTable('node', {
	id: integer('id').primaryKey(),
	path: text(),
	title: text('title'),
	short: text(),
	description: text(),
	type: text({ enum: ["cache", "tutorial"]}),
	content: text('content'), // HTML
	video: text('video'),
	x: real('x'),
	y: real('y'),
	uid: text(),
	guide: integer('guide_id').references(() => guide.id),
	quickTake: text()
})
export type Node = typeof node.$inferSelect

export const project = sqliteTable('project', {
	id: integer().primaryKey(),
	hidden: integer({ mode: 'boolean' }).default(false),
	title: text(),
	content: text(), // HTML
	short: text(),
	authors: text(),
	difficulty: integer(),
	icon: text(),
	guide: integer('guide_id').references(() => guide.id),
	nodes: text({ mode: 'json' }),
	path: text()
})
export type Project = InferSelectModel<typeof project>

export const pivotUserProject = sqliteTable('pivot_user_project', {
	userId: integer('user_id').references(() => user.id),
	projectId: integer('project_id').references(() => user.id),
	complete: integer({ mode: 'boolean' }).default(false)
},
	(t) => [primaryKey({ columns: [t.userId, t.projectId]})]
)

export const pivotNodeProject = sqliteTable('pivot_node_project', {
	nodeId: integer('node_id').references(() => node.id),
	projectId: integer('project_id').references(() => project.id),
	optional: integer({ mode: 'boolean' }).default(false),
	index: integer()
},
	(t) => [primaryKey({ columns: [t.nodeId, t.projectId]})]
)
export const edge = sqliteTable('edge', {
	id: integer('id').primaryKey(),
	uid: text('uid'),
	from: integer('from').references(() => node.id),
	to: integer('to').references(() => node.id),
	guide: integer('guide_id').references(() => guide.id),
	fromSide: text({ enum: ["left", "right", "top", "bottom"]}),
	toSide: text({ enum: ["left", "right", "top", "bottom"]})
})
export type Edge = typeof edge.$inferSelect


export const user_to_node = sqliteTable('user_to_node', {
	userId: integer('userId').references(() => user.id),
	nodeId: integer('nodeId').references(() => node.id),
	complete: integer({ mode: 'boolean' }).default(false)
},
	(t) => [primaryKey({ columns: [t.userId, t.nodeId]})]
)
export const user_to_question = sqliteTable('user_to_question', {
	userId: integer('userId').references(() => user.id),
	questionId: integer('questionId').references(() => question.id),
	complete: integer({ mode: 'boolean' })
},
	(t) => [primaryKey({ columns: [t.userId, t.questionId]})]
)

export const question = sqliteTable('question', {
	id: integer('id').primaryKey(),
	title: text(),
	raw: text({ mode: 'json' }),
	content: text('content'), //HTML
	options: text({ mode: 'json' }),
	node: integer('node_id').references(() => node.id)
})
export type Question = typeof question.$inferSelect

export const prompt = sqliteTable('prompt', {
	id: integer('id').primaryKey(),
	title: text(),
	raw: text({mode: 'json'}),
	content: text(),
	node: integer('node_id').references(() => node.id)
})

export const nodeGroup = sqliteTable('node_group', {
	id: integer('id').primaryKey(),
	alias: text().default('$default'),
	projectId: integer('project_id').references(() => project.id)
})
export type NodeGroup = typeof nodeGroup.$inferSelect

export const nodeToNodeGroup= sqliteTable('node_to_group', {
		nodeId: integer('node_id').references(()=>node.id),
		groupId: integer('group_id').references(() => nodeGroup.id),
		projectId: integer('project_id').references(() => project.id),
		optional: integer({ mode: 'boolean' }).default(false),
		index: integer()
	},
	(t) => [primaryKey({ columns: [t.nodeId, t.groupId]})]
)

export const projectToNodeGroup = sqliteTable('project_to_nodes', {
		groupId: integer('group_id').references(() => nodeGroup.id),
		projectId: integer('project_id').references(() => project.id),
		index: integer()
	},
	(t) => [primaryKey({ columns: [t.projectId, t.groupId]})]
)
