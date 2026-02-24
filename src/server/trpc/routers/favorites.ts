import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../index";

export const favoritesRouter = createTRPCRouter({
    toggle: protectedProcedure
        .input(z.object({ componentId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const existing = await ctx.db.favorite.findUnique({
                where: {
                    userId_componentId: {
                        userId: ctx.session.user.id,
                        componentId: input.componentId,
                    },
                },
            });

            if (existing) {
                await ctx.db.favorite.delete({
                    where: { id: existing.id },
                });
                return { favorited: false };
            }

            await ctx.db.favorite.create({
                data: {
                    userId: ctx.session.user.id,
                    componentId: input.componentId,
                },
            });
            return { favorited: true };
        }),

    getAll: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.favorite.findMany({
            where: { userId: ctx.session.user.id },
            include: {
                component: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        category: true,
                        thumbnailUrl: true,
                        isPremium: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }),
});
