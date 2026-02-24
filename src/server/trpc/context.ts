// src/server/trpc/context.ts
import { auth } from "@/server/auth/auth";
import { db } from "@/server/db";

export const createTRPCContext = async () => {
    const session = await auth();

    return {
        db,
        session,
    };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
