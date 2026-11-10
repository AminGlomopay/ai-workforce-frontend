import { queryOptions } from '@tanstack/react-query';

import { WORKFLOW_EDITOR_QUERY_KEYS } from '../constants/workflow-editor.constants';
import { WorkflowNotFoundError } from '../errors/workflow-not-found.error';
import { fetchWorkflow, fetchWorkflowNodeTypes } from './workflow-editor.api';

// The editor saves against the loaded version, so a background refetch must never move it.
export const workflowQueryOptions = (workflowId: string) =>
  queryOptions({
    queryKey: WORKFLOW_EDITOR_QUERY_KEYS.WORKFLOW(workflowId),
    queryFn: () => fetchWorkflow(workflowId),
    staleTime: Infinity,
    retry: (failureCount, error) => !(error instanceof WorkflowNotFoundError) && failureCount < 3,
  });

export const workflowNodeTypesQueryOptions = queryOptions({
  queryKey: WORKFLOW_EDITOR_QUERY_KEYS.NODE_TYPES,
  queryFn: fetchWorkflowNodeTypes,
  staleTime: Infinity,
});
