import { Connection, IsValidConnection, OnConnectEnd, useReactFlow } from '@xyflow/react';
import { toast } from 'sonner';

import { useWorkflowNodeTypes } from './use-workflow-node-types';
import { ConnectionBlockedToast } from '../components/connection-blocked-toast';
import { ITERATING_NODE_TYPES } from '../constants/workflow-editor.constants';
import { CanvasNode } from '../types/workflow-editor.types';
import { findNodeType } from '../utils/find-node-type';
import { findConnectionBlocker } from '../utils/graph-rules';

export const useConnectionRules = () => {
  const { getNode, getNodes, getEdges } = useReactFlow<CanvasNode>();
  const nodeTypes = useWorkflowNodeTypes();

  const nodeTypeOf = (nodeId: string) => {
    const node = getNode(nodeId);
    if (!node) throw new Error(`Node ${nodeId} is not on the canvas`);
    return findNodeType(nodeTypes, node.data.type, node.data.typeVersion);
  };

  const blockerOf = (connection: Connection) =>
    findConnectionBlocker(
      getEdges(),
      connection,
      getNodes()
        .filter(({ data }) => ITERATING_NODE_TYPES.includes(data.type))
        .map(({ id }) => id),
    );

  const isValidConnection: IsValidConnection = (connection) =>
    nodeTypeOf(connection.source).outputs[Number(connection.sourceHandle)].kind ===
      nodeTypeOf(connection.target).inputs[Number(connection.targetHandle)].kind &&
    !getEdges().some(
      (edge) =>
        edge.source === connection.source &&
        edge.sourceHandle === connection.sourceHandle &&
        edge.target === connection.target &&
        edge.targetHandle === connection.targetHandle,
    ) &&
    !blockerOf({ ...connection, sourceHandle: connection.sourceHandle ?? null, targetHandle: connection.targetHandle ?? null });

  // isValidConnection only greys the line out, so say why once the user lets go over a blocked handle.
  const onConnectEnd: OnConnectEnd = (_, { isValid, fromNode, fromHandle, toNode, toHandle }) => {
    if (isValid !== false || !fromNode || !fromHandle || !toNode || !toHandle) return;
    const [source, target] = fromHandle.type === 'source' ? [fromHandle, toHandle] : [toHandle, fromHandle];
    const reason = blockerOf({ source: source.nodeId, sourceHandle: source.id ?? null, target: target.nodeId, targetHandle: target.id ?? null });
    if (reason) toast.custom(() => <ConnectionBlockedToast reason={reason} />);
  };

  return { isValidConnection, onConnectEnd };
};
