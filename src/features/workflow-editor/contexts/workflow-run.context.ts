import { createContext } from 'react';

import { NodeRun, WorkflowExecutionDetail } from '../types/workflow-execution.types';

export interface WorkflowRun {
  executionId: string | null;
  setExecutionId: (executionId: string | null) => void;
  issues: string[];
  setIssues: (issues: string[]) => void;
  execution?: WorkflowExecutionDetail;
  runsByNode: Map<string, NodeRun[]>;
}

export const WorkflowRunContext = createContext<WorkflowRun | null>(null);
