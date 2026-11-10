import { FC } from 'react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from '@/routeTree.gen';
import { BackendError } from '@/shared/errors/backend.error';
import { UnauthenticatedError } from '@/shared/errors/unauthenticated.error';

const redirectToLoginOnUnauthenticated = (error: Error) => {
  if (error instanceof UnauthenticatedError) void router.navigate({ to: '/login', search: { returnTo: router.latestLocation.href } });
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: redirectToLoginOnUnauthenticated }),
  mutationCache: new MutationCache({ onError: redirectToLoginOnUnauthenticated }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => !(error instanceof BackendError && error.status < 500) && failureCount < 3,
    },
  },
});

const router = createRouter({ routeTree, context: { queryClient } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
