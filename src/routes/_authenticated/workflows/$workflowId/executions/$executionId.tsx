import { createFileRoute } from '@tanstack/react-router';

import {
  ExecutionNotFoundError,
  ExecutionNotFoundPane,
  ExecutionReplayLoading,
  ExecutionReplayPage,
  executionQueryOptions,
  workflowVersionQueryOptions,
} from '@/features/workflow-editor/public';

export const Route = createFileRoute('/_authenticated/workflows/$workflowId/executions/$executionId')({
  loader: async ({ context, params }) => {
    const execution = await context.queryClient.ensureQueryData(executionQueryOptions(params.executionId));
    if (execution.workflowId !== params.workflowId) throw new ExecutionNotFoundError();
    await context.queryClient.ensureQueryData(workflowVersionQueryOptions(params.workflowId, execution.workflowVersionId));
  },
  pendingComponent: ExecutionReplayLoading,
  component: ExecutionReplayPage,
  errorComponent: ExecutionNotFoundPane,
});
