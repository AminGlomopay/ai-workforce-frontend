import { createFileRoute } from '@tanstack/react-router';

import { NewWorkflowPage } from '@/features/workflows/public';

export const Route = createFileRoute('/_authenticated/workflows/new')({
  component: NewWorkflowPage,
});
