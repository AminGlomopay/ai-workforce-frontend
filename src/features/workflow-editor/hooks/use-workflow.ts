import { useSuspenseQuery } from '@tanstack/react-query';

import { workflowQueryOptions } from '../apis/workflow-editor.queries';

export const useWorkflow = (workflowId: string) => useSuspenseQuery(workflowQueryOptions(workflowId)).data;
