import { createFileRoute } from '@tanstack/react-router';

import { LoginPage } from '@/features/auth/public';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});
