import { FC, ReactNode, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { executionQueryOptions } from '../apis/workflow-editor.queries';
import { WorkflowRunContext } from '../contexts/workflow-run.context';
import { groupRunsByNode } from '../utils/execution-status';

interface WorkflowRunProviderProps {
  children: ReactNode;
}

// Optional data, so a disabled query rather than suspense: the canvas below must never remount.
export const WorkflowRunProvider: FC<WorkflowRunProviderProps> = ({ children }) => {
  const [executionId, setExecutionId] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const { data: execution } = useQuery({ ...executionQueryOptions(executionId ?? ''), enabled: executionId !== null });
  const runsByNode = useMemo(() => groupRunsByNode(execution?.nodeRuns ?? []), [execution]);

  const workflowRun = useMemo(
    () => ({ executionId, setExecutionId, issues, setIssues, execution, runsByNode }),
    [executionId, issues, execution, runsByNode],
  );

  return <WorkflowRunContext value={workflowRun}>{children}</WorkflowRunContext>;
};
