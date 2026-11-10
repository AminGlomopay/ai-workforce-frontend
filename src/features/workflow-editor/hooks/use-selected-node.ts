import { useNodes } from '@xyflow/react';

import { CanvasNode } from '../types/workflow-editor.types';

export const useSelectedNode = (): CanvasNode | undefined => {
  const selected = useNodes<CanvasNode>().filter((node) => node.selected);
  return selected.length === 1 ? selected[0] : undefined;
};
