import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  conversations: defineTable({
    groQuery: v.string(),
    convoId: v.string(),
    response: v.optional(v.string()),
    greivanceId: v.string(),
  }),
});

export default schema;