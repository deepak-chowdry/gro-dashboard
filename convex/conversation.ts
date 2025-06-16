import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createConversation = mutation({
  args: {
    groQuery: v.string(),
    convoId: v.string(),
    response: v.optional(v.string()),
    greivanceId: v.string(),
  },
  handler: async (ctx, args) => {
    const convoId = await ctx.db.insert("conversations", {
      groQuery: args.groQuery,
      convoId: args.convoId,
      response: args.response,
      greivanceId: args.greivanceId,
    });
    return convoId;
  },
});

export const updateConversation = mutation({
  args: {
    convoId: v.string(),
    response: v.string(),
  },
  handler: async (ctx, args) => {
    // Find the conversation by convoId
    const convo = await ctx.db
      .query("conversations")
      .filter(q => q.eq(q.field("convoId"), args.convoId))
      .first();

    if (!convo) {
      throw new Error("Conversation not found");
    }

    await ctx.db.patch(convo._id, {
      response: args.response,
    });
  },
});

export const getConversation = query({
  args: {
    greivanceId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("conversations").filter(q => q.eq(q.field("greivanceId"), args.greivanceId)).collect()
  },
});
