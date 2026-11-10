import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';

import { useWorkflowNodeTypes } from './use-workflow-node-types';
import { workflowQueryOptions } from '../apis/workflow-editor.queries';
import { CanvasNode } from '../types/workflow-editor.types';
import { toCanvasEdges, toCanvasNodes } from '../utils/workflow-graph';

export const useReloadWorkflow = (workflowId: string) => {
  const queryClient = useQueryClient();
  const { setNodes, setEdges } = useReactFlow<CanvasNode>();
  const nodeTypes = useWorkflowNodeTypes();

  return useMutation({
    mutationFn: () => queryClient.fetchQuery({ ...workflowQueryOptions(workflowId), staleTime: 0 }),
    onSuccess: ({ version }) => {
      setNodes(toCanvasNodes(version.nodes, nodeTypes));
      setEdges(toCanvasEdges(version.connections));
    },
    throwOnError: true,
  });
};
