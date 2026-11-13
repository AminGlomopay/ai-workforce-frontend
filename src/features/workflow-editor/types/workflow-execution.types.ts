export type ExecutionStatus = 'QUEUED' | 'RUNNING' | 'WAITING' | 'SUCCEEDED' | 'FAILED' | 'CRASHED';

export type ExecutionMode = 'MANUAL' | 'APPLICATION_EVENT' | 'SCHEDULE';

export type NodeRunStatus = 'RUNNING' | 'WAITING' | 'SUCCEEDED' | 'FAILED';

export type NodeData = Record<string, unknown>;

// A crash, or a failure outside any node, has a null nodeId. Runs that failed before nodeName was recorded
// lack it, and older ones lack nodeId too, so both may be missing.
export interface ExecutionError {
  nodeId?: string | null;
  nodeName?: string | null;
  message: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowVersionId: string;
  mode: ExecutionMode;
  status: ExecutionStatus;
  triggerNodeId: string;
  error: ExecutionError | null;
  startedAt: string | null;
  finishedAt: string | null;
  createdAt: string;
}

export interface WorkflowExecutionSummary extends WorkflowExecution {
  workflowVersion: { id: string; number: number };
  triggeredBy: { name: string } | null;
}

export interface WorkflowExecutionsPage {
  executions: WorkflowExecutionSummary[];
  nextCursor: string | null;
}

export type ExecutionStatusFilter = 'all' | 'succeeded' | 'failed' | 'running' | 'waiting';

export type ExecutionModeFilter = 'all' | 'manual' | 'event' | 'schedule';

export type ExecutionWindowFilter = 'all' | '24h' | '7d' | '30d';

export interface ExecutionFilters {
  status: ExecutionStatusFilter;
  mode: ExecutionModeFilter;
  window: ExecutionWindowFilter;
}

export interface NodeRun {
  id: string;
  nodeId: string;
  runIndex: number;
  iteration: number | null;
  status: NodeRunStatus;
  error: { message: string } | null;
  startedAt: string;
  finishedAt: string | null;
}

export interface WorkflowExecutionDetail extends WorkflowExecution {
  nodeRuns: NodeRun[];
}

export interface NodeRunDetail extends NodeRun {
  output: NodeData | null;
}
