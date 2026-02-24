import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "../index";
import { SubmissionStatus, ComponentStatus } from "@prisma/client";

export const adminRouter = createTRPCRouter({
    getPendingSubmissions: adminProcedure.query(async ({ ctx }) => {
        return ctx.db.submission.findMany({
            where: {
                status: {
                    in: [SubmissionStatus.UNDER_REVIEW, SubmissionStatus.DRAFT], // Drafts might be user's but usually under_review
                },
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        username: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }),

    approveSubmission: adminProcedure
        .input(z.object({ id: z.string(), slug: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const submission = await ctx.db.submission.findUnique({
                where: { id: input.id },
            });

            if (!submission) throw new Error("Submission not found");

            return ctx.db.$transaction(async (tx) => {
                // Create the actual component
                const component = await tx.component.create({
                    data: {
                        name: submission.name,
                        slug: input.slug,
                        description: submission.description,
                        category: submission.category,
                        tags: submission.tags,
                        authorId: submission.userId,
                        flutterCode: submission.flutterCode,
                        reactNativeCode: submission.reactNativeCode,
                        expoCode: submission.expoCode,
                        status: ComponentStatus.APPROVED,
                    },
                });

                // Update submission status
                await tx.submission.update({
                    where: { id: input.id },
                    data: { status: SubmissionStatus.APPROVED },
                });

                return component;
            });
        }),

    rejectSubmission: adminProcedure
        .input(z.object({ id: z.string(), note: z.string().optional() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.submission.update({
                where: { id: input.id },
                data: {
                    status: SubmissionStatus.REJECTED,
                    reviewNote: input.note,
                },
            });
        }),

    getAnalytics: adminProcedure.query(async ({ ctx }) => {
        // This is a placeholder for real analytics logic
        const [userCount, compCount, totalViews] = await Promise.all([
            ctx.db.user.count(),
            ctx.db.component.count(),
            ctx.db.component.aggregate({ _sum: { viewCount: true } }),
        ]);

        return {
            users: userCount,
            components: compCount,
            views: totalViews._sum.viewCount || 0,
        };
    }),
});
