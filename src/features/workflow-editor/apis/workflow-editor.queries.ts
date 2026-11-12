import { queryOptions } from '@tanstack/react-query';

import { EXECUTION_POLL_INTERVAL, WAITING_EXECUTION_POLL_INTERVAL, WORKFLOW_EDITOR_QUERY_KEYS } from '../constants/workflow-editor.constants';
import { WorkflowNotFoundError } from '../errors/workflow-not-found.error';
import { fetchExecution, fetchNodeRuns, fetchWorkflow, fetchWorkflowNodeTypes } from './workflow-editor.api';
import { NodeRun } from '../types/workflow-execution.types';
import { countFinishedRuns, isExecutionFinished } from '../utils/execution-status';

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

// No SSE yet, so an execution is polled until it finishes; a paused one (up to hours) more slowly.
export const executionQueryOptions = (executionId: string) =>
  queryOptions({
    queryKey: WORKFLOW_EDITOR_QUERY_KEYS.EXECUTION(executionId),
    queryFn: () => fetchExecution(executionId),
    refetchInterval: ({ state }) => {
      if (state.data && isExecutionFinished(state.data.status)) return false;
      return state.data?.status === 'WAITING' ? WAITING_EXECUTION_POLL_INTERVAL : EXECUTION_POLL_INTERVAL;
    },
  });

// Keyed on the finished run count and whether one is paused, so a node's runs refetch only when one pauses or ends.
export const nodeRunsQueryOptions = (executionId: string, nodeId: string, runs: NodeRun[]) =>
  queryOptions({
    queryKey: WORKFLOW_EDITOR_QUERY_KEYS.NODE_RUNS(
      executionId,
      nodeId,
      countFinishedRuns(runs),
      runs.some(({ status }) => status === 'WAITING'),
    ),
    queryFn: () => fetchNodeRuns(executionId, nodeId),
    staleTime: Infinity,
  });
