import { useSuspenseQuery } from '@tanstack/react-query';

import { executionQueryOptions } from '../apis/workflow-editor.queries';

export const useExecution = (executionId: string) => useSuspenseQuery(executionQueryOptions(executionId)).data;
