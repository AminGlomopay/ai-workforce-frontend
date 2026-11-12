export type ExecutionStatus = 'QUEUED' | 'RUNNING' | 'WAITING' | 'SUCCEEDED' | 'FAILED' | 'CRASHED';

export type NodeRunStatus = 'RUNNING' | 'WAITING' | 'SUCCEEDED' | 'FAILED';

export type NodeData = Record<string, unknown>;

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowVersionId: string;
  mode: 'MANUAL' | 'APPLICATION_EVENT';
  status: ExecutionStatus;
  triggerNodeId: string;
  error: { nodeId: string; message: string } | null;
  startedAt: string | null;
  finishedAt: string | null;
  createdAt: string;
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
  output: (NodeData | null)[] | null;
}
