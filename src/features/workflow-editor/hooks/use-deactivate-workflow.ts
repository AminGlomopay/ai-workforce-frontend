import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deactivateWorkflow } from '../apis/workflow-editor.api';
import { workflowQueryOptions } from '../apis/workflow-editor.queries';

import { workflowsQueryOptions } from '@/features/workflows/public';

export const useDeactivateWorkflow = (workflowId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deactivateWorkflow(workflowId),
    onSuccess: ({ activeVersionId }) => {
      queryClient.setQueryData(workflowQueryOptions(workflowId).queryKey, (workflow) => workflow && { ...workflow, activeVersionId });
      void queryClient.invalidateQueries({ queryKey: workflowsQueryOptions.queryKey });
    },
    throwOnError: true,
  });
};
