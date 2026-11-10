import { useSuspenseQuery } from '@tanstack/react-query';

import { workflowNodeTypesQueryOptions } from '../apis/workflow-editor.queries';

export const useWorkflowNodeTypes = () => useSuspenseQuery(workflowNodeTypesQueryOptions).data;
