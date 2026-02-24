import { createTRPCRouter } from "../index";
import { componentsRouter } from "./components";
import { favoritesRouter } from "./favorites";
import { collectionsRouter } from "./collections";
import { usersRouter } from "./users";
import { aiRouter } from "./ai";
import { adminRouter } from "./admin";
import { paymentsRouter } from "./payments";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    components: componentsRouter,
    favorites: favoritesRouter,
    collections: collectionsRouter,
    users: usersRouter,
    ai: aiRouter,
    admin: adminRouter,
    payments: paymentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
