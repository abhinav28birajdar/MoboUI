import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../index";

export const collectionsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1),
                description: z.string().optional(),
                isPublic: z.boolean().default(false),
                coverColor: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.collection.create({
                data: {
                    ...input,
                    userId: ctx.session.user.id,
                },
            });
        }),

    getAll: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.collection.findMany({
            where: { userId: ctx.session.user.id },
            include: {
                _count: {
                    select: { items: true },
                },
            },
            orderBy: { updatedAt: "desc" },
        });
    }),

    addItem: protectedProcedure
        .input(
            z.object({
                collectionId: z.string(),
                componentId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            // Ensure collection belongs to user
            const collection = await ctx.db.collection.findFirst({
                where: { id: input.collectionId, userId: ctx.session.user.id },
            });

            if (!collection) {
                throw new Error("Collection not found or access denied");
            }

            return ctx.db.collectionItem.upsert({
                where: {
                    collectionId_componentId: {
                        collectionId: input.collectionId,
                        componentId: input.componentId,
                    },
                },
                update: {},
                create: {
                    collectionId: input.collectionId,
                    componentId: input.componentId,
                },
            });
        }),

    removeItem: protectedProcedure
        .input(
            z.object({
                collectionId: z.string(),
                componentId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const collection = await ctx.db.collection.findFirst({
                where: { id: input.collectionId, userId: ctx.session.user.id },
            });

            if (!collection) {
                throw new Error("Collection not found or access denied");
            }

            await ctx.db.collectionItem.deleteMany({
                where: {
                    collectionId: input.collectionId,
                    componentId: input.componentId,
                },
            });
            return { success: true };
        }),
});
