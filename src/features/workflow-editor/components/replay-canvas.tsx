import { FC } from 'react';
import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';

import { CanvasControls } from './canvas-controls';
import { ReplayHud } from './replay-hud';
import { CANVAS_EDGE_TYPES, CANVAS_NODE_TYPES, DEFAULT_EDGE_OPTIONS, PRO_OPTIONS } from '../constants/canvas.constants';
import { FIT_VIEW_OPTIONS } from '../constants/workflow-editor.constants';
import { useWorkflow } from '../hooks/use-workflow';
import { useWorkflowNodeTypes } from '../hooks/use-workflow-node-types';
import { WorkflowVersion } from '../types/workflow-editor.types';
import { WorkflowExecutionDetail } from '../types/workflow-execution.types';
import { toCanvasEdges, toCanvasNodes } from '../utils/workflow-graph';

import { CornerMarks } from '@/shared/components/public';

interface ReplayCanvasProps {
  execution: WorkflowExecutionDetail;
  version: WorkflowVersion;
}

// The graph exactly as it ran: nodes can be selected to read their data, but not moved, wired or deleted.
// A failed run opens on the node that failed.
export const ReplayCanvas: FC<ReplayCanvasProps> = ({ execution, version }) => {
  const nodeTypes = useWorkflowNodeTypes();
  const { latestVersion } = useWorkflow(execution.workflowId);

  return (
    <div className='bg-canvas-glow relative flex-1 overflow-hidden'>
      <ReactFlow
        colorMode='dark'
        nodeTypes={CANVAS_NODE_TYPES}
        edgeTypes={CANVAS_EDGE_TYPES}
        defaultNodes={toCanvasNodes(version.nodes, nodeTypes).map((node) => ({ ...node, selected: node.id === execution.error?.nodeId }))}
        defaultEdges={toCanvasEdges(version.connections)}
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
        nodesDraggable={false}
        nodesConnectable={false}
        edgesFocusable={false}
        deleteKeyCode={null}
        fitView
        fitViewOptions={FIT_VIEW_OPTIONS}
        proOptions={PRO_OPTIONS}>
        <Background variant={BackgroundVariant.Dots} gap={16} />
        <CanvasControls />
      </ReactFlow>
      <CornerMarks />
      <div
        aria-hidden
        className='animate-scan via-primary-soft/25 pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent'
      />
      <ReplayHud execution={execution} version={version} latestVersion={latestVersion} />
    </div>
  );
};
