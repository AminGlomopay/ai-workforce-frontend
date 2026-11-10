import { IsValidConnection, useReactFlow } from '@xyflow/react';

import { useWorkflowNodeTypes } from './use-workflow-node-types';
import { CanvasNode } from '../types/workflow-editor.types';
import { findNodeType } from '../utils/find-node-type';

export const useIsValidConnection = (): IsValidConnection => {
  const { getNode, getEdges } = useReactFlow<CanvasNode>();
  const nodeTypes = useWorkflowNodeTypes();

  const nodeTypeOf = (nodeId: string) => {
    const node = getNode(nodeId);
    if (!node) throw new Error(`Node ${nodeId} is not on the canvas`);
    return findNodeType(nodeTypes, node.data.type, node.data.typeVersion);
  };

  return ({ source, sourceHandle, target, targetHandle }) =>
    nodeTypeOf(source).outputs[Number(sourceHandle)].kind === nodeTypeOf(target).inputs[Number(targetHandle)].kind &&
    !getEdges().some(
      (edge) => edge.source === source && edge.sourceHandle === sourceHandle && edge.target === target && edge.targetHandle === targetHandle,
    );
};
