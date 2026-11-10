import { WorkflowNodeGroup } from '../types/workflow-editor.types';
import { ExecutionStatus } from '../types/workflow-execution.types';

import { BACKEND_URL } from '@/shared/constants/backend.constants';

export const WORKFLOW_EDITOR_ENDPOINTS = {
  WORKFLOW: (workflowId: string) => `${BACKEND_URL}/workflows/${workflowId}`,
  NODE_TYPES: `${BACKEND_URL}/workflow-node-types`,
  EXECUTIONS: (workflowId: string) => `${BACKEND_URL}/workflows/${workflowId}/executions`,
  EXECUTION: (executionId: string) => `${BACKEND_URL}/workflow-executions/${executionId}`,
  NODE_RUNS: (executionId: string, nodeId: string) => `${BACKEND_URL}/workflow-executions/${executionId}/node-runs/${nodeId}`,
};

export const WORKFLOW_EDITOR_QUERY_KEYS = {
  WORKFLOW: (workflowId: string) => ['workflows', 'detail', workflowId],
  NODE_TYPES: ['workflow-node-types'],
  EXECUTION: (executionId: string) => ['workflow-executions', executionId],
  NODE_RUNS: (executionId: string, nodeId: string, finishedRuns: number) => ['workflow-executions', executionId, 'node-runs', nodeId, finishedRuns],
};

export const NODE_GROUP_LABELS: Record<WorkflowNodeGroup, string> = {
  trigger: 'Triggers',
  controlFlow: 'Control flow',
  action: 'Actions',
};

export const NODE_TYPE_DRAG_FORMAT = 'application/x-workflow-node-type';

export const OPERATION_PROPERTY_NAME = 'operation';

export const FIT_VIEW_OPTIONS = { maxZoom: 1 };

export const SAVED_TOAST_DURATION = 4500;

export const RUN_BAR_AUTO_HIDE_DELAY = 5000;

export const EXECUTION_POLL_INTERVAL = 1000;

export const FINISHED_EXECUTION_STATUSES: ExecutionStatus[] = ['SUCCEEDED', 'FAILED', 'CRASHED'];

// Node type descriptions don't say which types iterate (the backend checks for an `iterate` method),
// so loops are known by type. Their body is everything reachable from this output.
export const ITERATING_NODE_TYPES = ['loop'];

export const LOOP_BODY_OUTPUT = '0';
