import { createFileRoute } from '@tanstack/react-router';

import { WorkflowEditorPage, WorkflowLoadError } from '@/features/workflow-editor/public';
import { workflowQueryOptions } from '@/features/workflows/public';
import { LoadingState } from '@/shared/components/public';

export const Route = createFileRoute('/_authenticated/workflows/$workflowId')({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(workflowQueryOptions(params.workflowId)),
  pendingComponent: () => <LoadingState label='Loading workflow' />,
  errorComponent: WorkflowLoadError,
  component: WorkflowEditorPage,
});
