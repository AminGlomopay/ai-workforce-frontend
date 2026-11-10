import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { createWorkflow } from '../apis/workflows.api';
import { workflowQueryOptions } from '../apis/workflows.queries';
import { WORKFLOWS_QUERY_KEYS } from '../constants/workflows.constants';

import { ValidationError } from '@/shared/errors/validation.error';

export const useCreateWorkflow = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkflow,
    onSuccess: async (workflow) => {
      queryClient.setQueryData(workflowQueryOptions(workflow.id).queryKey, workflow);
      void queryClient.invalidateQueries({ queryKey: WORKFLOWS_QUERY_KEYS.LIST, exact: true });
      await navigate({ to: '/workflows/$workflowId', params: { workflowId: workflow.id } });
    },
    throwOnError: (error) => !(error instanceof ValidationError),
  });
};
