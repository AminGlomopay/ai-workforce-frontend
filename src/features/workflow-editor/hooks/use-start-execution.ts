import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useWorkflowRun } from './use-workflow-run';
import { startExecution } from '../apis/workflow-editor.api';
import { executionQueryOptions } from '../apis/workflow-editor.queries';
import { WORKFLOW_EDITOR_QUERY_KEYS } from '../constants/workflow-editor.constants';
import { WorkflowHasIssuesError } from '../errors/workflow-has-issues.error';

export const useStartExecution = (workflowId: string) => {
  const queryClient = useQueryClient();
  const { setExecutionId, setIssues } = useWorkflowRun();

  return useMutation({
    mutationFn: (versionId: string) => startExecution(workflowId, versionId),
    onMutate: () => {
      setIssues([]);
      setExecutionId(null);
    },
    onSuccess: (execution) => {
      queryClient.setQueryData(executionQueryOptions(execution.id).queryKey, { ...execution, nodeRuns: [] });
      setExecutionId(execution.id);
      void queryClient.invalidateQueries({ queryKey: WORKFLOW_EDITOR_QUERY_KEYS.EXECUTIONS_OF(workflowId) });
    },
    onError: (error) => {
      if (error instanceof WorkflowHasIssuesError) setIssues(error.messages);
    },
  });
};
