import { useSuspenseQuery } from '@tanstack/react-query';

import { workflowQueryOptions } from '../apis/workflows.queries';

export const useWorkflow = (id: string) => useSuspenseQuery(workflowQueryOptions(id)).data;
