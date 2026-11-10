import { FC } from 'react';
import { Background, Node, ReactFlow } from '@xyflow/react';

import { FIT_VIEW_OPTIONS } from '../constants/workflow-editor.constants';

import { AddTriggerNode } from './add-trigger-node';
import { CanvasControls } from './canvas-controls';
import { CanvasNodesReadout } from './canvas-nodes-readout';

import { CornerMarks } from '@/shared/components/public';

const NODE_TYPES = { addTrigger: AddTriggerNode };

const PLACEHOLDER_NODES: Node[] = [
  { id: 'add-trigger', type: 'addTrigger', position: { x: 0, y: 0 }, data: {}, draggable: false, selectable: false },
];

interface WorkflowCanvasProps {
  nodes: unknown;
}

export const WorkflowCanvas: FC<WorkflowCanvasProps> = ({ nodes }) => (
  <div className='bg-canvas-glow relative min-h-0 flex-1'>
    <ReactFlow nodes={PLACEHOLDER_NODES} nodeTypes={NODE_TYPES} fitView fitViewOptions={FIT_VIEW_OPTIONS} proOptions={{ hideAttribution: true }}>
      <Background gap={16} size={2} patternClassName='fill-foreground/10' />
      <CanvasNodesReadout nodes={nodes} />
      <CanvasControls />
    </ReactFlow>
    <CornerMarks />
  </div>
);
