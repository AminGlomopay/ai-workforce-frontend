import { FC } from 'react';
import { Background, BackgroundVariant, Controls, ReactFlow, useStore } from '@xyflow/react';

import { CanvasEmptyHint } from './canvas-empty-hint';
import { WorkflowCanvasNode } from './workflow-canvas-node';
import { useIsValidConnection } from '../hooks/use-is-valid-connection';
import { useNodeDrop } from '../hooks/use-node-drop';
import { useWorkflow } from '../hooks/use-workflow';
import { toCanvasEdges, toCanvasNodes } from '../utils/workflow-graph';

const NODE_TYPES = { workflowNode: WorkflowCanvasNode };

const DEFAULT_EDGE_OPTIONS = { animated: true };

const DELETE_KEYS = ['Backspace', 'Delete'];

const FIT_VIEW_OPTIONS = { maxZoom: 1 };

interface WorkflowCanvasProps {
  workflowId: string;
}

export const WorkflowCanvas: FC<WorkflowCanvasProps> = ({ workflowId }) => {
  const { version } = useWorkflow(workflowId);
  const isEmpty = useStore((state) => state.nodes.length === 0);
  const isValidConnection = useIsValidConnection();
  const { onDragOver, onDrop } = useNodeDrop();

  return (
    <div className='bg-canvas-glow relative flex-1' onDragOver={onDragOver} onDrop={onDrop}>
      <ReactFlow
        colorMode='dark'
        nodeTypes={NODE_TYPES}
        defaultNodes={toCanvasNodes(version.nodes)}
        defaultEdges={toCanvasEdges(version.connections)}
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
        isValidConnection={isValidConnection}
        deleteKeyCode={DELETE_KEYS}
        fitView
        fitViewOptions={FIT_VIEW_OPTIONS}>
        <Background variant={BackgroundVariant.Dots} gap={16} />
        <Controls showInteractive={false} />
      </ReactFlow>
      {isEmpty && <CanvasEmptyHint />}
    </div>
  );
};
