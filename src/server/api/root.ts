import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { Youtube } from "./routers/youtube";
import { BulletinRoute } from "./routers/bulletin";
import { FaceGenRoute } from "./routers/facegen";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  youtube: Youtube,
  bulletin: BulletinRoute,
  facegen: FaceGenRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;
