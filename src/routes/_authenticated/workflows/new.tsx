import { createFileRoute } from '@tanstack/react-router';

import { WorkflowEditorPage } from '@/features/workflow-editor/public';

export const Route = createFileRoute('/_authenticated/workflows/new')({
  component: WorkflowEditorPage,
});
