import { queryOptions } from '@tanstack/react-query';

import { WORKFLOW_STALE_TIME_MS, WORKFLOWS_QUERY_KEYS } from '../constants/workflows.constants';
import { fetchWorkflow, fetchWorkflows } from './workflows.api';

export const workflowsQueryOptions = queryOptions({
  queryKey: WORKFLOWS_QUERY_KEYS.LIST,
  queryFn: fetchWorkflows,
});

export const workflowQueryOptions = (id: string) =>
  queryOptions({
    queryKey: WORKFLOWS_QUERY_KEYS.DETAIL(id),
    queryFn: () => fetchWorkflow(id),
    staleTime: WORKFLOW_STALE_TIME_MS,
  });
