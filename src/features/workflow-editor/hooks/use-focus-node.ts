import { useReactFlow } from '@xyflow/react';

import { CanvasNode } from '../types/workflow-editor.types';

export const useFocusNode = () => {
  const { setNodes, fitView } = useReactFlow<CanvasNode>();

  return (nodeId: string) => {
    setNodes((nodes) => nodes.map((node) => ({ ...node, selected: node.id === nodeId })));
    void fitView({ nodes: [{ id: nodeId }], duration: 600, maxZoom: 1 });
  };
};
