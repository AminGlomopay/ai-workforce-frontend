import { useMutation, useQueryClient } from '@tanstack/react-query';

import { saveWorkflow } from '../apis/workflow-editor.api';
import { workflowQueryOptions } from '../apis/workflow-editor.queries';
import { SaveWorkflowInput } from '../types/workflow-editor.types';

import { workflowsQueryOptions } from '@/features/workflows/public';

export const useSaveWorkflow = (workflowId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SaveWorkflowInput) => saveWorkflow(workflowId, input),
    onSuccess: (workflow) => {
      queryClient.setQueryData(workflowQueryOptions(workflowId).queryKey, workflow);
      void queryClient.invalidateQueries({ queryKey: workflowsQueryOptions.queryKey });
    },
  });
};
