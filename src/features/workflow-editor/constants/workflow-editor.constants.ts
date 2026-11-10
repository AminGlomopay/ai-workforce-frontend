import { WorkflowNodeGroup } from '../types/workflow-editor.types';

import { BACKEND_URL } from '@/shared/constants/backend.constants';

export const WORKFLOW_EDITOR_ENDPOINTS = {
  WORKFLOW: (workflowId: string) => `${BACKEND_URL}/workflows/${workflowId}`,
  NODE_TYPES: `${BACKEND_URL}/workflow-node-types`,
};

export const WORKFLOW_EDITOR_QUERY_KEYS = {
  WORKFLOW: (workflowId: string) => ['workflows', 'detail', workflowId],
  NODE_TYPES: ['workflow-node-types'],
};

export const NODE_GROUP_LABELS: Record<WorkflowNodeGroup, string> = {
  trigger: 'Triggers',
  action: 'Actions',
};

export const NODE_TYPE_DRAG_FORMAT = 'application/x-workflow-node-type';

export const OPERATION_PROPERTY_NAME = 'operation';
