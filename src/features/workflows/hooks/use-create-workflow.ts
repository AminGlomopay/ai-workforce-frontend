import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { createWorkflow } from '../apis/workflows.api';
import { workflowsQueryOptions } from '../apis/workflows.queries';
import { ValidationError } from '../errors/validation.error';

export const useCreateWorkflow = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkflow,
    onSuccess: async ({ id }) => {
      await queryClient.invalidateQueries({ queryKey: workflowsQueryOptions.queryKey });
      await navigate({ to: '/workflows/$workflowId', params: { workflowId: id } });
    },
    throwOnError: (error) => !(error instanceof ValidationError),
  });
};
