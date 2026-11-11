import { MANUAL_TRIGGER_TYPE, ZOHO_DESK_TRIGGER_TYPE } from '../constants/workflow-editor.constants';
import { WorkflowNode } from '../types/workflow-editor.types';

export const runsOnlyOnZohoDeskEvents = (nodes: WorkflowNode[]): boolean =>
  nodes.some(({ type }) => type === ZOHO_DESK_TRIGGER_TYPE) && !nodes.some(({ type }) => type === MANUAL_TRIGGER_TYPE);
