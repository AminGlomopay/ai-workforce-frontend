import { FC } from 'react';
import { Navigate, useParams } from '@tanstack/react-router';

import { ExecutionsEmptyState } from '../components/executions-empty-state';
import { useExecutionFilters } from '../hooks/use-execution-filters';
import { useExecutions } from '../hooks/use-executions';
import { hasActiveFilters } from '../utils/execution-filters';

// Opens the newest run; with none yet, the empty state waits and the next poll brings the first one in.
export const ExecutionsIndexPage: FC = () => {
  const { workflowId } = useParams({ from: '/_authenticated/workflows/$workflowId' });
  const filters = useExecutionFilters();
  const [newest] = useExecutions(workflowId, filters).executions;
  if (newest) return <Navigate to='/workflows/$workflowId/executions/$executionId' params={{ workflowId, executionId: newest.id }} search replace />;

  return <ExecutionsEmptyState workflowId={workflowId} isFiltered={hasActiveFilters(filters)} />;
};
