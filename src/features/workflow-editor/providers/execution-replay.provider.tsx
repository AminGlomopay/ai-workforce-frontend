import { FC, ReactNode, useMemo } from 'react';

import { WorkflowRunContext } from '../contexts/workflow-run.context';
import { WorkflowExecutionDetail } from '../types/workflow-execution.types';
import { groupRunsByNode } from '../utils/execution-status';

const NO_ISSUES: string[] = [];

const throwReadOnly = () => {
  throw new Error('A run replay is read-only');
};

interface ExecutionReplayProviderProps {
  execution: WorkflowExecutionDetail;
  children: ReactNode;
}

// Feeds a past run to the same context the editor's canvas nodes, edges and run data read from.
export const ExecutionReplayProvider: FC<ExecutionReplayProviderProps> = ({ execution, children }) => {
  const workflowRun = useMemo(
    () => ({
      executionId: execution.id,
      setExecutionId: throwReadOnly,
      issues: NO_ISSUES,
      setIssues: throwReadOnly,
      execution,
      runsByNode: groupRunsByNode(execution.nodeRuns),
    }),
    [execution],
  );

  return <WorkflowRunContext value={workflowRun}>{children}</WorkflowRunContext>;
};
