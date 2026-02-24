import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../index";

export const usersRouter = createTRPCRouter({
    getProfile: publicProcedure
        .input(z.object({ username: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.user.findUnique({
                where: { username: input.username },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    bio: true,
                    avatarUrl: true,
                    website: true,
                    githubUrl: true,
                    twitterUrl: true,
                    role: true,
                    planType: true,
                    createdAt: true,
                    _count: {
                        select: {
                            components: true,
                            favorites: true,
                            collections: true,
                        },
                    },
                },
            });
        }),

    updateProfile: protectedProcedure
        .input(
            z.object({
                name: z.string().optional(),
                bio: z.string().optional(),
                website: z.string().url().optional().or(z.literal("")),
                githubUrl: z.string().url().optional().or(z.literal("")),
                twitterUrl: z.string().url().optional().or(z.literal("")),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.user.update({
                where: { id: ctx.session.user.id },
                data: input,
            });
        }),

    getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const [compCount, favCount, collCount, subCount] = await Promise.all([
            ctx.db.component.count({ where: { authorId: userId } }),
            ctx.db.favorite.count({ where: { userId } }),
            ctx.db.collection.count({ where: { userId } }),
            ctx.db.submission.count({ where: { userId } }),
        ]);

        return {
            components: compCount,
            favorites: favCount,
            collections: collCount,
            submissions: subCount,
        };
    }),
});
