// src/server/trpc/routers/components.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../index";

export const componentsRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(),
                category: z.string().nullish(),
                framework: z.enum(["FLUTTER", "REACT_NATIVE", "EXPO"]).nullish(),
                search: z.string().nullish(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { limit, cursor, category, framework, search } = input;
            const take = limit ?? 50;

            const items = await ctx.db.component.findMany({
                take: take + 1,
                where: {
                    status: "APPROVED",
                    ...(category ? { category } : {}),
                    ...(framework ? { frameworks: { has: framework } } : {}),
                    ...(search
                        ? {
                            OR: [
                                { name: { contains: search, mode: "insensitive" } },
                                { description: { contains: search, mode: "insensitive" } },
                                { tags: { has: search } },
                            ],
                        }
                        : {}),
                },
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: { createdAt: "desc" },
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (items.length > take) {
                const nextItem = items.pop();
                nextCursor = nextItem?.id;
            }

            return {
                items,
                nextCursor,
            };
        }),

    getBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ ctx, input }) => {
            const component = await ctx.db.component.findUnique({
                where: { slug: input.slug },
                include: {
                    props: true,
                    author: {
                        select: {
                            name: true,
                            username: true,
                            avatarUrl: true,
                        },
                    },
                },
            });

            return component;
        }),
});
