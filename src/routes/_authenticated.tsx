import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { AppLayout } from '@/features/app-layout/public';
import { fetchCurrentUser, UnauthenticatedError } from '@/features/auth/public';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    try {
      return { user: await fetchCurrentUser() };
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
