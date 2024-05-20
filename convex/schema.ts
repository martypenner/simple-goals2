import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const goalsSchema = {
  title: v.string(),
  description: v.string(),
  updatedAt: v.int64(),
  completedAt: v.optional(v.int64()),
  endDate: v.int64(),
  /** Track the number of times this item / goal has been done. */
  progress: v.int64(),
  /**
   * Track the total number of times this item / goal wants to be done.
   * Dividing the progress by this number is what shows up in the progress bar.
   * This is optional because it wasn't there from the beginning.
   */
  desiredCount: v.int64(),
};

export default defineSchema(
  {
    goals: defineTable(goalsSchema),
  },
  // If you ever get an error about schema mismatch
  // between your data and your schema, and you cannot
  // change the schema to match the current data in your database,
  // you can:
  //  1. Use the dashboard to delete tables or individual documents
  //     that are causing the error.
  //  2. Change this option to `false` and make changes to the data
  //     freely, ignoring the schema. Don't forget to change back to `true`!
  { schemaValidation: true },
);
