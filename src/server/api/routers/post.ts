import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { twobttns } from "~/server/twobttns.ts";


function generatePlayURL(phoneNumber: string) {
  const url = twobttns.generatePlayUrl({
    gameId: "your-awesome-game",
    playerId: phoneNumber,
    numItems: 42,
    callbackUrl: "https://example.com/callback",
  });

  return url;
}

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  generatePlayUrl: protectedProcedure
    .input(z.object({ phoneNumber: z.string().min(1) }))
    .query(({ input }) => {
      const playURL = generatePlayURL(input.phoneNumber);
      return { playURL };
    }),
    
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
