import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 2 // 2MB
    })
    .beforeDelete(() => {
      return true;
    }),
  publicFiles: es
    .fileBucket({
      maxSize: 1024 * 1024 * 2, // 2MB
      accept: ['application/pdf'] // accept only pdf file
    })
    .beforeDelete(() => {
      return true;
    })
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
