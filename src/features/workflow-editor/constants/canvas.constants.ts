import { WorkflowCanvasNode } from '../components/workflow-canvas-node';
import { WorkflowEdge } from '../components/workflow-edge';

// Shared by the editor canvas and run replays, so both draw nodes and edges the same way.
export const CANVAS_NODE_TYPES = { workflowNode: WorkflowCanvasNode };

export const CANVAS_EDGE_TYPES = { default: WorkflowEdge };

export const DEFAULT_EDGE_OPTIONS = { animated: true };

export const PRO_OPTIONS = { hideAttribution: true };
