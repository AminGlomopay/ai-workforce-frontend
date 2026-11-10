import { findNodeType, hasNodeType } from './find-node-type';
import { toSavedParameters, withDefaultParameters } from './node-parameters';
import { CanvasEdge, CanvasNode, WorkflowConnection, WorkflowGraph, WorkflowNode, WorkflowNodeType } from '../types/workflow-editor.types';

// Nodes of a type the backend no longer serves keep their parameters exactly as loaded.
export const toCanvasNodes = (nodes: WorkflowNode[], nodeTypes: WorkflowNodeType[]): CanvasNode[] =>
  nodes.map(({ id, name, type, typeVersion, position: [x, y], parameters }) => ({
    id,
    type: 'workflowNode',
    position: { x, y },
    data: {
      name,
      type,
      typeVersion,
      parameters: hasNodeType(nodeTypes, type, typeVersion)
        ? withDefaultParameters(findNodeType(nodeTypes, type, typeVersion).properties, parameters)
        : parameters,
    },
  }));

// Loaded edges carry their kind so connections of unknown node types still save.
export const toCanvasEdges = (connections: WorkflowConnection[]): CanvasEdge[] =>
  connections.map(({ kind, sourceNodeId, sourceOutput, targetNodeId, targetInput }) => ({
    id: `${sourceNodeId}:${sourceOutput}->${targetNodeId}:${targetInput}`,
    source: sourceNodeId,
    sourceHandle: String(sourceOutput),
    target: targetNodeId,
    targetHandle: String(targetInput),
    data: { kind },
  }));

export const toWorkflowGraph = (nodes: CanvasNode[], edges: CanvasEdge[], nodeTypes: WorkflowNodeType[]): WorkflowGraph => {
  const nodesById = new Map(nodes.map((node) => [node.id, node]));

  return {
    nodes: nodes.map(({ id, position, data }) => ({
      id,
      name: data.name,
      type: data.type,
      typeVersion: data.typeVersion,
      position: [position.x, position.y],
      parameters: hasNodeType(nodeTypes, data.type, data.typeVersion)
        ? toSavedParameters(findNodeType(nodeTypes, data.type, data.typeVersion).properties, data.parameters)
        : data.parameters,
    })),
    connections: edges.map(({ source, sourceHandle, target, targetHandle, data }) => {
      const sourceNode = nodesById.get(source);
      if (!sourceNode) throw new Error(`Edge source node ${source} is not on the canvas`);
      const sourceOutput = Number(sourceHandle);

      return {
        kind: data?.kind ?? findNodeType(nodeTypes, sourceNode.data.type, sourceNode.data.typeVersion).outputs[sourceOutput].kind,
        sourceNodeId: source,
        sourceOutput,
        targetNodeId: target,
        targetInput: Number(targetHandle),
      };
    }),
  };
};
