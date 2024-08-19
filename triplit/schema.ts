import { type ClientSchema, type Entity, Schema as S } from '@triplit/client'

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
	},
} satisfies ClientSchema

// Use the `Entity` type to extract clean types for your collections
export type Goal = Entity<typeof schema, 'goals'>
