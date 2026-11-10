import { createFileRoute } from '@tanstack/react-router';

import { LoginPage } from '@/features/auth/public';

export const Route = createFileRoute('/login')({
  validateSearch: (search): { returnTo?: string } => ({ returnTo: typeof search.returnTo === 'string' ? search.returnTo : undefined }),
  component: LoginPage,
});
