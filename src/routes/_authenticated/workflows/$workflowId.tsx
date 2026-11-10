import { createFileRoute } from '@tanstack/react-router';

import { WorkflowEditorPage, WorkflowNotFoundPage, workflowNodeTypesQueryOptions, workflowQueryOptions } from '@/features/workflow-editor/public';
import { LoadingState } from '@/shared/components/public';

export const Route = createFileRoute('/_authenticated/workflows/$workflowId')({
  loader: ({ context, params }) =>
    Promise.all([
      context.queryClient.ensureQueryData(workflowQueryOptions(params.workflowId)),
      context.queryClient.ensureQueryData(workflowNodeTypesQueryOptions),
    ]),
  pendingComponent: () => <LoadingState label='Loading workflow' />,
  component: WorkflowEditorPage,
  errorComponent: WorkflowNotFoundPage,
});
