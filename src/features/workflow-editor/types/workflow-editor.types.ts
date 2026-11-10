import { Node } from '@xyflow/react';

export type WorkflowPortKind = 'main';

export interface WorkflowPort {
  kind: WorkflowPortKind;
}

export type WorkflowNodeGroup = 'trigger';

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
}

export interface WorkflowNode {
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
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
}

export interface Workflow {
  id: string;
  name: string;
  latestVersion: number;
  version: WorkflowVersion;
}

export interface SaveWorkflowInput extends WorkflowGraph {
  baseVersionId: string;
}

export type WorkflowErrorResponse =
  | { statusCode: number; message: string; errorCode: 'WORKFLOW_NOT_FOUND' | 'WORKFLOW_VERSION_CONFLICT' }
  | { statusCode: number; message: string; errorCode: 'INVALID_WORKFLOW_GRAPH'; errors: string[] };

export interface ValidationErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

export type CanvasNode = Node<Pick<WorkflowNode, 'name' | 'type' | 'typeVersion'>, 'workflowNode'>;
