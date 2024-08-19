import {
	type ClientSchema,
	type Entity,
	type Roles,
	Schema as S,
} from '@triplit/client'

/**
 * Define your schema here. After:
 * - Pass your schema to your Triplit client
 * - Push your schema to your Triplit server with 'triplit schema push'
 *
 * For more information about schemas, see the docs: https://www.triplit.dev/docs/schemas
 */
export const schema = {
	goals: {
		schema: S.Schema({
			id: S.Id(),
			title: S.String({ nullable: false }),
			userId: S.String({ nullable: false }),
			description: S.String({ nullable: true }),
			createdAt: S.Date({ nullable: false, default: S.Default.now() }),
			updatedAt: S.Date({ nullable: false, default: S.Default.now() }),
			completedAt: S.Date({ nullable: false, default: S.Default.now() }),
			endDate: S.Date({ nullable: false, default: S.Default.now() }),
			/** Track the number of times this item / goal has been done. */
			progress: S.Number({ nullable: false }),
			/**
			 * Track the total number of times this item / goal wants to be done.
			 * Dividing the progress by this number is what shows up in the progress bar.
			 */
			desiredCount: S.Number({ nullable: false }),
		}),
		permissions: {
			// Allow all
			admin: {
				read: {
					filter: [true],
				},
				insert: {
					filter: [true],
				},
				update: {
					filter: [true],
				},
				delete: {
					filter: [true],
				},
			},
			// Allow only the author to update their own goals
			user: {
				read: {
					filter: [['authorId', '=', '$role.userId']],
				},
				insert: {
					filter: [['authorId', '=', '$role.userId']],
				},
				update: {
					filter: [['authorId', '=', '$role.userId']],
				},
				postUpdate: {
					filter: [['authorId', '=', '$role.userId']],
				},
				delete: {
					filter: [['authorId', '=', '$role.userId']],
				},
			},
		},
	},
} satisfies ClientSchema

// Use the `Entity` type to extract clean types for your collections
export type Goal = Entity<typeof schema, 'goals'>

export const roles: Roles = {
	admin: {
		match: {
			type: 'admin',
		},
	},
	user: {
		match: {
			type: 'user',
			uid: '$userId',
		},
	},
}
