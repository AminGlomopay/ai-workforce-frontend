import { FC } from 'react';
import { Background, Node, ReactFlow } from '@xyflow/react';

import { FIT_VIEW_OPTIONS } from '../constants/workflow-editor.constants';

import { AddTriggerNode } from './add-trigger-node';
import { CanvasControls } from './canvas-controls';

import { CornerMarks } from '@/shared/components/public';

const NODE_TYPES = { addTrigger: AddTriggerNode };

const NODES: Node[] = [{ id: 'add-trigger', type: 'addTrigger', position: { x: 0, y: 0 }, data: {}, draggable: false, selectable: false }];

export const WorkflowCanvas: FC = () => (
  <div className='bg-canvas-glow relative min-h-0 flex-1'>
    <ReactFlow nodes={NODES} nodeTypes={NODE_TYPES} fitView fitViewOptions={FIT_VIEW_OPTIONS} proOptions={{ hideAttribution: true }}>
      <Background gap={16} size={2} patternClassName='fill-foreground/10' />
      <CanvasControls />
    </ReactFlow>
    <CornerMarks />
  </div>
);
