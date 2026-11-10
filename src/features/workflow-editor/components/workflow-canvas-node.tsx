import { FC } from 'react';
import { NodeProps } from '@xyflow/react';

import { KnownCanvasNode } from './known-canvas-node';
import { UnknownCanvasNode } from './unknown-canvas-node';
import { useWorkflowNodeTypes } from '../hooks/use-workflow-node-types';
import { CanvasNode } from '../types/workflow-editor.types';
import { hasNodeType } from '../utils/find-node-type';

export const WorkflowCanvasNode: FC<NodeProps<CanvasNode>> = (props) =>
  hasNodeType(useWorkflowNodeTypes(), props.data.type, props.data.typeVersion) ? <KnownCanvasNode {...props} /> : <UnknownCanvasNode {...props} />;
