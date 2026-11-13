import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { executionsQueryOptions } from '../apis/workflow-editor.queries';
import { ExecutionFilters } from '../types/workflow-execution.types';

export const useExecutions = (workflowId: string, filters: ExecutionFilters) => {
  const query = useSuspenseInfiniteQuery(executionsQueryOptions(workflowId, filters));
  return { ...query, executions: query.data.pages.flatMap((page) => page.executions) };
};
