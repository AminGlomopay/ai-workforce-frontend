import { queryOptions } from '@tanstack/react-query';

import { WORKFLOWS_QUERY_KEYS } from '../constants/workflows.constants';
import { fetchWorkflows } from './workflows.api';

export const workflowsQueryOptions = queryOptions({
  queryKey: WORKFLOWS_QUERY_KEYS.LIST,
  queryFn: fetchWorkflows,
});
