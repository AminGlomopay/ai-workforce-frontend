import { MANUAL_TRIGGER_TYPE } from '../constants/workflow-editor.constants';
import { WorkflowNode, WorkflowNodeType } from '../types/workflow-editor.types';

const isEventTrigger = (nodeTypes: WorkflowNodeType[], { type, typeVersion }: WorkflowNode): boolean =>
  type !== MANUAL_TRIGGER_TYPE &&
  nodeTypes.some((nodeType) => nodeType.type === type && nodeType.version === typeVersion && nodeType.group === 'trigger');

export const runsOnlyOnEvents = (nodes: WorkflowNode[], nodeTypes: WorkflowNodeType[]): boolean =>
  nodes.some((node) => isEventTrigger(nodeTypes, node)) && !nodes.some(({ type }) => type === MANUAL_TRIGGER_TYPE);
