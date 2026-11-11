import { useMutation, useQueryClient } from '@tanstack/react-query';

import { publishWorkflow } from '../apis/workflow-editor.api';
import { workflowQueryOptions } from '../apis/workflow-editor.queries';

import { workflowsQueryOptions } from '@/features/workflows/public';

// Only the published pointer is taken from the response: the editor keeps saving against the version it loaded.
export const usePublishWorkflow = (workflowId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (versionId: string) => publishWorkflow(workflowId, versionId),
    onSuccess: ({ activeVersionId }) => {
      queryClient.setQueryData(workflowQueryOptions(workflowId).queryKey, (workflow) => workflow && { ...workflow, activeVersionId });
      void queryClient.invalidateQueries({ queryKey: workflowsQueryOptions.queryKey });
    },
  });
};
