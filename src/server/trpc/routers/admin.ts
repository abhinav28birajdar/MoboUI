import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "../index";

// Status enums - define locally for now until Prisma schema is finalized
const SubmissionStatus = {
    DRAFT: 'DRAFT',
    UNDER_REVIEW: 'UNDER_REVIEW',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
} as const;

const ComponentStatus = {
    DRAFT: 'DRAFT',
    APPROVED: 'APPROVED',
    DEPRECATED: 'DEPRECATED'
} as const;

export const adminRouter = createTRPCRouter({
    getPendingSubmissions: adminProcedure.query(async ({ ctx }) => {
        // Placeholder - will fetch from DB when schema is finalized
        return [];
    }),

    approveSubmission: adminProcedure
        .input(z.object({ id: z.string(), slug: z.string() }))
        .mutation(async ({ ctx, input }) => {
            // Placeholder mutation - will implement when DB schema is ready
            return { id: input.id, slug: input.slug, status: 'APPROVED' };
        }),

    rejectSubmission: adminProcedure
        .input(z.object({ id: z.string(), note: z.string().optional() }))
        .mutation(async ({ ctx, input }) => {
            // Placeholder mutation
            return { id: input.id, status: 'REJECTED' };
        }),

    getAnalytics: adminProcedure.query(async ({ ctx }) => {
        // Placeholder analytics
        return {
            userCount: 0,
            componentCount: 0,
            totalViews: 0
        };
    }),
});
