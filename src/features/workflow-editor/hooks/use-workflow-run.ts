import { use } from 'react';

import { WorkflowRunContext } from '../contexts/workflow-run.context';

export const useWorkflowRun = () => {
  const workflowRun = use(WorkflowRunContext);
  if (!workflowRun) throw new Error('useWorkflowRun must be used inside WorkflowRunProvider');
  return workflowRun;
};
