import { FC } from 'react';
import { Background, BackgroundVariant, ReactFlow, useStore } from '@xyflow/react';

import { CanvasControls } from './canvas-controls';
import { CanvasEmptyHint } from './canvas-empty-hint';
import { RunBar } from './run-bar';
import { CANVAS_EDGE_TYPES, CANVAS_NODE_TYPES, DEFAULT_EDGE_OPTIONS, PRO_OPTIONS } from '../constants/canvas.constants';
import { FIT_VIEW_OPTIONS } from '../constants/workflow-editor.constants';
import { useConnectionRules } from '../hooks/use-connection-rules';
import { useNodeDrop } from '../hooks/use-node-drop';
import { useWorkflow } from '../hooks/use-workflow';
import { useWorkflowNodeTypes } from '../hooks/use-workflow-node-types';
import { toCanvasEdges, toCanvasNodes } from '../utils/workflow-graph';

const DELETE_KEYS = ['Backspace', 'Delete'];

interface WorkflowCanvasProps {
  workflowId: string;
}

export const WorkflowCanvas: FC<WorkflowCanvasProps> = ({ workflowId }) => {
  const { version } = useWorkflow(workflowId);
  const nodeTypes = useWorkflowNodeTypes();
  const isEmpty = useStore((state) => state.nodes.length === 0);
  const { isValidConnection, onConnectEnd } = useConnectionRules();
  const { onDragOver, onDrop } = useNodeDrop();

  return (
    <div className='bg-canvas-glow relative flex-1' onDragOver={onDragOver} onDrop={onDrop}>
      <ReactFlow
        colorMode='dark'
        nodeTypes={CANVAS_NODE_TYPES}
        edgeTypes={CANVAS_EDGE_TYPES}
        defaultNodes={toCanvasNodes(version.nodes, nodeTypes)}
        defaultEdges={toCanvasEdges(version.connections)}
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
        isValidConnection={isValidConnection}
        onConnectEnd={onConnectEnd}
        deleteKeyCode={DELETE_KEYS}
        fitView
        fitViewOptions={FIT_VIEW_OPTIONS}
        proOptions={PRO_OPTIONS}>
        <Background variant={BackgroundVariant.Dots} gap={16} />
        <CanvasControls />
      </ReactFlow>
      {isEmpty && <CanvasEmptyHint />}
      <RunBar />
    </div>
  );
};
