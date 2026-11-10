import { DragEvent } from 'react';
import { useReactFlow } from '@xyflow/react';

import { useWorkflowNodeTypes } from './use-workflow-node-types';
import { NODE_TYPE_DRAG_FORMAT } from '../constants/workflow-editor.constants';
import { CanvasNode } from '../types/workflow-editor.types';
import { findNodeType } from '../utils/find-node-type';
import { uniqueNodeName } from '../utils/unique-node-name';

export const useNodeDrop = () => {
  const { screenToFlowPosition, getNodes, addNodes } = useReactFlow<CanvasNode>();
  const nodeTypes = useWorkflowNodeTypes();

  const onDragOver = (event: DragEvent) => {
    if (!event.dataTransfer.types.includes(NODE_TYPE_DRAG_FORMAT)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    const { type, version } = JSON.parse(event.dataTransfer.getData(NODE_TYPE_DRAG_FORMAT));
    const nodeType = findNodeType(nodeTypes, type, version);
    const takenNames = new Set(getNodes().map((node) => node.data.name));

    addNodes({
      id: crypto.randomUUID(),
      type: 'workflowNode',
      position: screenToFlowPosition({ x: event.clientX, y: event.clientY }),
      data: { name: uniqueNodeName(nodeType.defaults.name, takenNames), type: nodeType.type, typeVersion: nodeType.version },
    });
  };

  return { onDragOver, onDrop };
};
