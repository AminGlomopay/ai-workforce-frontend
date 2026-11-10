import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { AppLayout } from '@/features/app-layout/public';
import { currentUserQueryOptions, UnauthenticatedError } from '@/features/auth/public';
import { workflowsQueryOptions } from '@/features/workflows/public';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData(currentUserQueryOptions);
    } catch (error) {
      if (error instanceof UnauthenticatedError) throw redirect({ to: '/login' });
      throw error;
    }
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(workflowsQueryOptions),
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});
