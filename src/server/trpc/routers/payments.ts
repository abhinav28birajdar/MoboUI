import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../index";

export const paymentsRouter = createTRPCRouter({
    createCheckoutSession: protectedProcedure
        .input(z.object({ planId: z.string(), interval: z.enum(["month", "year"]) }))
        .mutation(async ({ ctx, input }) => {
            // This will integrate with Stripe later
            return {
                url: "https://checkout.stripe.com/placeholder",
                sessionId: "cs_test_placeholder",
            };
        }),

    getSubscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
        const user = await ctx.db.user.findUnique({
            where: { id: ctx.session.user.id },
            select: {
                planType: true,
                subscriptionEnd: true,
                isActive: true,
            },
        });

        return user;
    }),
});
