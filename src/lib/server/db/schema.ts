import { relations} from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';


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
	title: text('title'),
	short: text('short').default("Short description"),
	long: text('long').default("Long description"),
	authors: text().default("CodeVA Curriculum")
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
// export const relationsSubjectCourse = defineRelations({ subject, course }, {
// 	course: {
// 		subject: r.one.subject({
// 			from: r.course.subjectId,
// 			to:   r.subject.id
// 		})
// 	},
// 	subject: {
// 		relatedCourses: r.many.course()
// 	}
// })

// // Grade levels
export const grade = sqliteTable('grade', {
	id: integer('id').primaryKey(),
	title: text(),
	abbr: text()
})
export type Grade = typeof grade.$inferSelect

export const standard = sqliteTable('standard', {
	id: integer('id').primaryKey(),
	abbr: text(),
	title: text(),
	gradeId: integer('grade_id').references(() => grade.id),
	subjectId: integer('subject_id').references(() => subject.id),
	text: text() // HTML
})
export type Standard = typeof standard.$inferSelect
// export const relationStandardsGrades = defineRelations({ standard, grade, subject }, (r) => ({
// 	standard: {
// 		grade: r.one.grade({
// 			from: r.standard.gradeId,
// 			to:   r.grade.id
// 		}),
// 		subject: r.one.subject({
// 			from: r.standard.subjectId,
// 			to: r.subject.id
// 		})
// 	},
// 	grade: {
// 		standards: r.many.standard(),
// 		subjects: r.many.subjects()
// 	},
// }))

export const elementsToGrades = sqliteTable('elements_to_grades', {
	elementId: integer('element_id').references(() => element.id),
	gradeId: integer('grade_id').references(() => grade.id)
})

export const subjectsToElements = sqliteTable('subjects_to_elements', {
	elementId: integer('element_id').references(() => element.id),
	subjectId: integer('subject_id').references(() => subject.id)
})

export const standardsToElements = sqliteTable('standards_to_elements', {
	elementId: integer('element_id').references(() => element.id),
	standardId: integer('standard_id').references(() => standard.id)
})

// export const elementRelations = relations({ element, grade, subject, elementsToGrades, subjectsToElements, standardsToElements }, (r) => ({
// 	element: {
// 		grades: r.many.grade({
// 			from: r.element.id.through(r.elementsToGrades.elementId),
// 			to:   r.grade.id.through(r.elementsToGrades.gradeId)
// 		}),
// 		standards: r.many.standard({
// 			from: r.element.id.through(r.standardsToElements.elementId),
// 			to:   r.standard.id.through(r.standardsToElements.standardId)
// 		}),
// 		subjects: r.many.subjects({
// 			from: r.element.id.through(r.subjectsToElements.elementId),
// 			to:   r.subject.id.through(r.subjectsToElements.subjectId)
// 		}),
// 	},
// 	grade: {
// 		relatedElements: r.many.elements()
// 	},
// 	standard: {
// 		relatedElements: r.many.elements()
// 	},
// 	subject: {
// 		relatedElements: r.many.elements()
// 	},
// 	user: {
// 		savedElements: r.many.elements({
// 			from: r.user.id.through(r.pivotUserElement.userId),
// 			to: r.element.id.through(r.pivotUserElement.elementId)
// 		}),
// 		savedProjects: r.many.project({
// 			from: r.user.id.through(r.pivotUserProject.userId),
// 			to: r.element.id.through(r.pivotUserProject.projectId)
// 		})
// 	}
// }))

// // pivot tables


// export const subjectsToGrades = sqliteTable('subjects_to_grades', {
// 	subjectId: integer('subject_id').references(() => subject.id),
// 	gradeId: integer('grade_id').references(() => grade.id)
// })


// Trail Guide Stuff
export const node = sqliteTable('node', {
	id: integer().primaryKey({ autoIncrement: true }),
	path: text(),
	content: text(), // HTML
	short: text(),
	video: text(),
	authors: text(),
	type: text({ enum: ["tutorial", "cache"]})
})
export type Node = typeof node.$inferSelect;

export const project = sqliteTable('project', {
	id: integer().primaryKey({autoIncrement: true}),
	title: text(),
	content: text(), // HTML
	short: text(),
	authors: text(),
	difficulty: integer(),
	icon: text()
})
export type Project = typeof project.$inferSelect;

export const pivotNodeProject = sqliteTable('pivot_node_project', {
	nodeId: integer('node_id').references(() => node.id),
	projectId: integer('project_id').references(() => project.id)
})

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
})

export const pivotUserProject = sqliteTable('pivot_user_project', {
	userId: integer('user_id').references(() => user.id),
	projectId: integer('project_id').references(() => user.id)
})

// Trail Guide stuff
export const guide = sqliteTable('guide', {
	id: integer('id').primaryKey(),
	title: text('title'),
	path: text('path'),
	short: text('short'),
	description: text('description'),
	image: text('image')
})
export type Guide = typeof guide.$inferSelect;
