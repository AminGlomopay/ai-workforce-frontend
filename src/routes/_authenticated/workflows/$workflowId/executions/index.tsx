import { createFileRoute } from '@tanstack/react-router';

import { ExecutionsIndexPage } from '@/features/workflow-editor/public';

export const Route = createFileRoute('/_authenticated/workflows/$workflowId/executions/')({
  component: ExecutionsIndexPage,
});
