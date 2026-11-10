import { useMemo } from 'react';

import { useWorkflow } from './use-workflow';
import { useWorkflowNodeTypes } from './use-workflow-node-types';
import { WorkflowGraph } from '../types/workflow-editor.types';
import { toCanvasEdges, toCanvasNodes, toWorkflowGraph } from '../utils/workflow-graph';

export const useHasUnsavedChanges = (workflowId: string, graph: WorkflowGraph) => {
  const { version } = useWorkflow(workflowId);
  const nodeTypes = useWorkflowNodeTypes();
  const savedGraph = useMemo(
    () => JSON.stringify(toWorkflowGraph(toCanvasNodes(version.nodes), toCanvasEdges(version.connections), nodeTypes)),
    [version, nodeTypes],
  );

  return JSON.stringify(graph) !== savedGraph;
};
