import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { AppLayout } from '@/features/app-layout/public';
import { currentUserQueryOptions, UnauthenticatedError } from '@/features/auth/public';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData(currentUserQueryOptions);
    } catch (error) {
      if (error instanceof UnauthenticatedError) throw redirect({ to: '/login' });
      throw error;
    }
  },
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});
