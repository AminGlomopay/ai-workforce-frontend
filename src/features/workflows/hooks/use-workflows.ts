import { useSuspenseQuery } from '@tanstack/react-query';

import { workflowsQueryOptions } from '../apis/workflows.queries';

export const useWorkflows = () => useSuspenseQuery(workflowsQueryOptions).data;
