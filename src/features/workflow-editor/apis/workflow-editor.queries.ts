import { queryOptions } from '@tanstack/react-query';

import { EXECUTION_POLL_INTERVAL, WORKFLOW_EDITOR_QUERY_KEYS } from '../constants/workflow-editor.constants';
import { WorkflowNotFoundError } from '../errors/workflow-not-found.error';
import { fetchExecution, fetchNodeRuns, fetchWorkflow, fetchWorkflowNodeTypes } from './workflow-editor.api';
import { isExecutionFinished } from '../utils/execution-status';

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

// No SSE yet, so a running execution is polled until it finishes.
export const executionQueryOptions = (executionId: string) =>
  queryOptions({
    queryKey: WORKFLOW_EDITOR_QUERY_KEYS.EXECUTION(executionId),
    queryFn: () => fetchExecution(executionId),
    refetchInterval: ({ state }) => (state.data && isExecutionFinished(state.data.status) ? false : EXECUTION_POLL_INTERVAL),
  });

// Keyed on the finished run count, so a node's runs refetch only when another of its runs ends.
export const nodeRunsQueryOptions = (executionId: string, nodeId: string, finishedRuns: number) =>
  queryOptions({
    queryKey: WORKFLOW_EDITOR_QUERY_KEYS.NODE_RUNS(executionId, nodeId, finishedRuns),
    queryFn: () => fetchNodeRuns(executionId, nodeId),
    staleTime: Infinity,
  });
