import { FC } from 'react';
import { Handle, HandleType, Position } from '@xyflow/react';

import { WorkflowPort } from '../types/workflow-editor.types';

interface NodePortHandlesProps {
  type: HandleType;
  ports: WorkflowPort[];
}

export const NodePortHandles: FC<NodePortHandlesProps> = ({ type, ports }) =>
  ports.map((_, index) => (
    <Handle
      key={index}
      id={String(index)}
      type={type}
      position={type === 'target' ? Position.Left : Position.Right}
      style={{ top: `${((index + 1) / (ports.length + 1)) * 100}%` }}
      className='bg-background border-primary-soft hover:bg-primary-soft size-3 border-2 transition-colors'
    />
  ));
