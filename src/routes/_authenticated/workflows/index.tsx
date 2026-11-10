import { createFileRoute } from '@tanstack/react-router';

import { WorkflowsListPage } from '@/features/workflows/public';

export const Route = createFileRoute('/_authenticated/workflows/')({
  component: WorkflowsListPage,
});
