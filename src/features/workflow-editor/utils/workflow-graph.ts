import { Edge } from '@xyflow/react';

import { findNodeType } from './find-node-type';
import { CanvasNode, WorkflowConnection, WorkflowGraph, WorkflowNode, WorkflowNodeType } from '../types/workflow-editor.types';

export const toCanvasNodes = (nodes: WorkflowNode[]): CanvasNode[] =>
  nodes.map(({ id, name, type, typeVersion, position: [x, y] }) => ({
    id,
    type: 'workflowNode',
    position: { x, y },
    data: { name, type, typeVersion },
  }));

export const toCanvasEdges = (connections: WorkflowConnection[]): Edge[] =>
  connections.map(({ sourceNodeId, sourceOutput, targetNodeId, targetInput }) => ({
    id: `${sourceNodeId}:${sourceOutput}->${targetNodeId}:${targetInput}`,
    source: sourceNodeId,
    sourceHandle: String(sourceOutput),
    target: targetNodeId,
    targetHandle: String(targetInput),
  }));

export const toWorkflowGraph = (nodes: CanvasNode[], edges: Edge[], nodeTypes: WorkflowNodeType[]): WorkflowGraph => {
  const nodesById = new Map(nodes.map((node) => [node.id, node]));

  return {
    nodes: nodes.map(({ id, position, data }) => ({
      id,
      name: data.name,
      type: data.type,
      typeVersion: data.typeVersion,
      position: [position.x, position.y],
    })),
    connections: edges.map(({ source, sourceHandle, target, targetHandle }) => {
      const sourceNode = nodesById.get(source);
      if (!sourceNode) throw new Error(`Edge source node ${source} is not on the canvas`);
      const sourceOutput = Number(sourceHandle);

      return {
        kind: findNodeType(nodeTypes, sourceNode.data.type, sourceNode.data.typeVersion).outputs[sourceOutput].kind,
        sourceNodeId: source,
        sourceOutput,
        targetNodeId: target,
        targetInput: Number(targetHandle),
      };
    }),
  };
};
