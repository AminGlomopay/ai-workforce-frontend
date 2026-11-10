import { FC } from 'react';
import { ReactFlowProvider } from '@xyflow/react';

import { EditorTopBar } from './editor-top-bar';
import { NodePalette } from './node-palette';
import { NodeSettingsPanel } from './node-settings-panel';
import { WorkflowCanvas } from './workflow-canvas';
import { useWorkflow } from '../hooks/use-workflow';
import { useWorkflowNodeTypes } from '../hooks/use-workflow-node-types';
import { toCanvasEdges, toCanvasNodes } from '../utils/workflow-graph';

interface WorkflowEditorProps {
  workflowId: string;
}

// The provider seeds the store so the top bar sees the graph on first render; the canvas
// seeds it again because React Flow resets the store when it unmounts.
export const WorkflowEditor: FC<WorkflowEditorProps> = ({ workflowId }) => {
  const { version } = useWorkflow(workflowId);
  const nodeTypes = useWorkflowNodeTypes();

  return (
    <ReactFlowProvider defaultNodes={toCanvasNodes(version.nodes, nodeTypes)} defaultEdges={toCanvasEdges(version.connections)}>
      <div className='flex h-dvh flex-col'>
        <EditorTopBar workflowId={workflowId} />
        <div className='flex min-h-0 flex-1'>
          <WorkflowCanvas workflowId={workflowId} />
          <NodeSettingsPanel />
          <NodePalette />
        </div>
      </div>
    </ReactFlowProvider>
  );
};
