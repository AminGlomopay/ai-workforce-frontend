import { useEdges, useNodes } from '@xyflow/react';

import { useWorkflowNodeTypes } from './use-workflow-node-types';
import { CanvasEdge, CanvasNode } from '../types/workflow-editor.types';
import { toWorkflowGraph } from '../utils/workflow-graph';

export const useWorkflowGraph = () => toWorkflowGraph(useNodes<CanvasNode>(), useEdges<CanvasEdge>(), useWorkflowNodeTypes());
