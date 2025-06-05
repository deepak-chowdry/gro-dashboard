import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createConversation = mutation({
  args: {
    groQuery: v.string(),
    convoId: v.string(),
    response: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const convoId = await ctx.db.insert("conversations", {
      groQuery: args.groQuery,
      convoId: args.convoId,
      response: args.response,
    });
    return convoId;
  },
});

export const updateConversation = mutation({
  args: {
    id: v.id("conversations"),
    response: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      response: args.response,
    });
  },
});


export const getConversation = query({
    handler: async (ctx) => {
        return await ctx.db.query("conversations");
    }
})
