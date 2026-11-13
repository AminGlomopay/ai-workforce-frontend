import { WorkflowNodeGroup } from '../types/workflow-editor.types';
import {
  ExecutionFilters,
  ExecutionMode,
  ExecutionModeFilter,
  ExecutionStatus,
  ExecutionStatusFilter,
  ExecutionWindowFilter,
} from '../types/workflow-execution.types';

import { BACKEND_URL } from '@/shared/constants/backend.constants';

export const WORKFLOW_EDITOR_ENDPOINTS = {
  WORKFLOW: (workflowId: string) => `${BACKEND_URL}/workflows/${workflowId}`,
  ACTIVATE: (workflowId: string) => `${BACKEND_URL}/workflows/${workflowId}/activate`,
  DEACTIVATE: (workflowId: string) => `${BACKEND_URL}/workflows/${workflowId}/deactivate`,
  NODE_TYPES: `${BACKEND_URL}/workflow-node-types`,
  EXECUTIONS: (workflowId: string) => `${BACKEND_URL}/workflows/${workflowId}/executions`,
  VERSION: (workflowId: string, versionId: string) => `${BACKEND_URL}/workflows/${workflowId}/versions/${versionId}`,
  EXECUTION: (executionId: string) => `${BACKEND_URL}/workflow-executions/${executionId}`,
  NODE_RUNS: (executionId: string, nodeId: string) => `${BACKEND_URL}/workflow-executions/${executionId}/node-runs/${nodeId}`,
};

export const WORKFLOW_EDITOR_QUERY_KEYS = {
  WORKFLOW: (workflowId: string) => ['workflows', 'detail', workflowId],
  NODE_TYPES: ['workflow-node-types'],
  VERSION: (workflowId: string, versionId: string) => ['workflows', 'versions', workflowId, versionId],
  EXECUTIONS_OF: (workflowId: string) => ['workflow-executions', 'list', workflowId],
  EXECUTIONS: (workflowId: string, filters: ExecutionFilters) => ['workflow-executions', 'list', workflowId, filters],
  EXECUTION: (executionId: string) => ['workflow-executions', executionId],
  NODE_RUNS: (executionId: string, nodeId: string, finishedRuns: number, isWaiting: boolean) => [
    'workflow-executions',
    executionId,
    'node-runs',
    nodeId,
    finishedRuns,
    isWaiting,
  ],
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

export const WAITING_EXECUTION_POLL_INTERVAL = 10000;

export const EXECUTIONS_PAGE_SIZE = 20;

// The run history polls for new runs and status changes; React Query pauses it while the tab is hidden.
export const EXECUTIONS_POLL_INTERVAL = 5000;

export const LIVE_CLOCK_INTERVAL = 100;

export const FINISHED_EXECUTION_STATUSES: ExecutionStatus[] = ['SUCCEEDED', 'FAILED', 'CRASHED'];

// Node type descriptions don't say which types iterate (the backend checks for an `iterate` method),
// so loops are known by type. Their body is everything reachable from this output.
export const ITERATING_NODE_TYPES = ['loop'];

export const LOOP_BODY_OUTPUT = '0';

// Runs from the editor start at the Manual Trigger; event triggers only start published versions.
export const MANUAL_TRIGGER_TYPE = 'manualTrigger';

// Matches the backend's save DTO: z.string().trim().min(1).max(128).
export const NODE_NAME_MAX_LENGTH = 128;

// Run output trees open their top-level lists and objects; deeper ones start collapsed behind a one-line preview.
export const JSON_EXPANDED_DEPTH = 1;

export const JSON_PREVIEW_ENTRIES = 4;

export const JSON_PREVIEW_VALUE_MAX_CHARS = 32;

// Name-like keys lead a collapsed object's preview, so a GitHub file reads as its filename rather than its sha.
export const JSON_NAME_KEY_PATTERN = /name$/i;

export const JSON_TEXT_MAX_LINES = 6;

export const JSON_TEXT_MAX_CHARS = 400;

export const DEFAULT_EXECUTION_FILTERS: ExecutionFilters = { status: 'all', mode: 'all', window: 'all' };

export const EXECUTION_STATUS_FILTERS: Record<ExecutionStatusFilter, { label: string; statuses: ExecutionStatus[] }> = {
  all: { label: 'All', statuses: [] },
  succeeded: { label: 'Succeeded', statuses: ['SUCCEEDED'] },
  failed: { label: 'Failed', statuses: ['FAILED', 'CRASHED'] },
  running: { label: 'Running', statuses: ['QUEUED', 'RUNNING'] },
  waiting: { label: 'Paused', statuses: ['WAITING'] },
};

export const EXECUTION_MODE_FILTERS: Record<ExecutionModeFilter, { label: string; modes: ExecutionMode[] }> = {
  all: { label: 'All', modes: [] },
  manual: { label: 'Manual', modes: ['MANUAL'] },
  event: { label: 'Event', modes: ['APPLICATION_EVENT'] },
  schedule: { label: 'Schedule', modes: ['SCHEDULE'] },
};

export const EXECUTION_WINDOW_FILTERS: Record<ExecutionWindowFilter, { label: string; ms: number | null }> = {
  all: { label: 'All time', ms: null },
  '24h': { label: '24h', ms: 24 * 60 * 60 * 1000 },
  '7d': { label: '7d', ms: 7 * 24 * 60 * 60 * 1000 },
  '30d': { label: '30d', ms: 30 * 24 * 60 * 60 * 1000 },
};

export const EXECUTION_STATUS_LABELS: Record<ExecutionStatus, string> = {
  QUEUED: 'Queued',
  RUNNING: 'Running',
  WAITING: 'Paused',
  SUCCEEDED: 'Succeeded',
  FAILED: 'Failed',
  CRASHED: 'Crashed',
};

export const EXECUTION_MODE_LABELS: Record<ExecutionMode, string> = {
  MANUAL: 'Manual',
  APPLICATION_EVENT: 'Event',
  SCHEDULE: 'Schedule',
};
