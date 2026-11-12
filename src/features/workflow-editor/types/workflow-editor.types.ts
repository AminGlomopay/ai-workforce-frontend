import { Edge, Node } from '@xyflow/react';

export type WorkflowPortKind = 'main';

export interface WorkflowPort {
  kind: WorkflowPortKind;
  name?: string;
}

export type WorkflowNodeGroup = 'trigger' | 'controlFlow' | 'action';

export type NodeParameters = Record<string, string>;

export interface NodePropertyOption {
  name: string;
  value: string;
  description?: string;
  action?: string;
}

interface BaseNodeProperty {
  name: string;
  displayName: string;
  default: string;
  required?: boolean;
  description?: string;
  displayOptions?: { show: Record<string, string[]> };
}

export interface StringNodeProperty extends BaseNodeProperty {
  type: 'string';
  placeholder?: string;
  noDataExpression?: boolean;
  typeOptions?: { rows?: number };
}

export interface OptionsNodeProperty extends BaseNodeProperty {
  type: 'options';
  options: NodePropertyOption[];
}

export type NodeProperty = StringNodeProperty | OptionsNodeProperty;

export interface WorkflowNodeType {
  type: string;
  version: number;
  displayName: string;
  description: string;
  group: WorkflowNodeGroup;
  icon: string;
  defaults: { name: string };
  maxNodes?: number;
  inputs: WorkflowPort[];
  outputs: WorkflowPort[];
  properties: NodeProperty[];
}

export interface WorkflowNode {
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters: NodeParameters;
}

export interface WorkflowConnection {
  kind: WorkflowPortKind;
  sourceNodeId: string;
  sourceOutput: number;
  targetNodeId: string;
  targetInput: number;
}

export interface WorkflowGraph {
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
}

export interface WorkflowVersion extends WorkflowGraph {
  id: string;
  number: number;
  createdAt: string;
}

export interface Workflow {
  id: string;
  name: string;
  latestVersion: number;
  activeVersionId: string | null;
  version: WorkflowVersion;
}

export interface SaveWorkflowInput extends WorkflowGraph {
  baseVersionId: string;
}

export type WorkflowErrorResponse =
  | { statusCode: number; message: string; errorCode: 'WORKFLOW_NOT_FOUND' | 'WORKFLOW_VERSION_CONFLICT' | 'WORKFLOW_VERSION_NOT_FOUND' }
  | { statusCode: number; message: string; errorCode: 'INVALID_WORKFLOW_GRAPH' | 'WORKFLOW_HAS_ISSUES'; errors: string[] };

export interface ValidationErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

export type CanvasNode = Node<Pick<WorkflowNode, 'name' | 'type' | 'typeVersion' | 'parameters'>, 'workflowNode'>;

export type CanvasEdge = Edge<{ kind: WorkflowPortKind }>;

export interface PaletteEntry {
  key: string;
  label: string;
  description: string;
  parameters: NodeParameters;
}
