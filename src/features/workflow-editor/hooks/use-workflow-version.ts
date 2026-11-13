import { useSuspenseQuery } from '@tanstack/react-query';

import { workflowVersionQueryOptions } from '../apis/workflow-editor.queries';

export const useWorkflowVersion = (workflowId: string, versionId: string) =>
  useSuspenseQuery(workflowVersionQueryOptions(workflowId, versionId)).data;
